declare module 'mammoth' {
  interface ExtractRawTextResult {
    value: string;
    messages: any[];
  }

  function extractRawText(options: { buffer: ArrayBuffer | Buffer }): Promise<ExtractRawTextResult>;

  export { extractRawText };
}
