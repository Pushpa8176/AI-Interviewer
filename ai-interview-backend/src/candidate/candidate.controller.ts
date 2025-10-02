import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateService } from './candidate.service';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import pdfParse from 'pdf-parse';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  // Step 1: Extract candidate info from resume
  @Post('extract')
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
          cb(null, `${timestamp}-${file.originalname}`);
        },
      }),
    }),
  )
  async extractResume(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('No file uploaded');

    let text = '';
    if (file.mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      text = data.text;
    } else {
      text = fs.readFileSync(file.path, 'utf-8');
    }

    const candidateInfo = this.candidateService.extractCandidateInfo(text);
    return { candidateInfo, resumeFile: file.filename };
  }

  // Step 2: Save candidate to DB
  @Post('upload')
async uploadCandidate(
  @Body() body: { name: string; email: string; phone: string; resumeFile?: string },
) {
  try {
    // Check if email already exists
    const existing = await this.candidateService.findByEmail(body.email);
    if (existing) {
      return {
        success: false,          // <- explicitly mark failure
        message: 'Email already exists.', // frontend can use this
      };
    }

    // Save new candidate
    const saved = await this.candidateService.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      resumeFile: body.resumeFile,
    });

    return {
      success: true,                     // <- explicitly mark success
      message: 'Candidate saved successfully!',
      candidate: saved,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Candidate save failed.',
      error: err.message,
    };
  }
}

 // Check email existence
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    if (!email) return { exists: false };
    const existing = await this.candidateService.findByEmail(email);
    return { exists: !!existing };
  }

  // Upload final score & summary
  @Post('upload-final/:id')
  async uploadFinal(@Param('id') id: number, @Body() body: { score: number; summary: string }) {
    const candidate = await this.candidateService.findOne(id);
    if (!candidate) return { message: 'Candidate not found' };

    candidate.score = body.score;
    candidate.summary = body.summary;
    await this.candidateService.create(candidate);

    return { message: 'Final score updated', candidate };
  }

  @Get('all')
  async getAllCandidates() {
    const candidates = await this.candidateService.findAll();
    return candidates.map(c => ({
      ...c,
      resumeFileOriginal: c.resumeFile?.split('-').slice(2).join('-') ?? '',
      uploadedAt: c.uploadedAt,
    }));
  }

  @Delete('delete/:id')
  async deleteCandidate(@Param('id') id: number) {
    const candidate = await this.candidateService.findOne(id);
    if (!candidate) return { message: 'Candidate not found' };
    await this.candidateService.delete(id);
    return { message: 'Candidate deleted successfully' };
  }
  
}
