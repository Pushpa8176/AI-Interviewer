import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔹 Enable CORS for all origins
  app.enableCors({ origin: '*' });

  // 🔹 Ensure uploads folder exists
  const uploadPath = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

  // 🔹 Serve uploaded files statically
  app.useStaticAssets(uploadPath, { prefix: '/uploads/' });

  // 🔹 Start server
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
