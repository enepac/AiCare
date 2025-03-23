declare module "tesseract.js" {
  export interface RecognizeData {
    text: string;
    confidence: number;
    lines: { text: string }[];
  }

  export interface RecognizeResult {
    data: RecognizeData;
  }

  export function recognize(image: Buffer | string, lang: string): Promise<RecognizeResult>;

  export interface TesseractWorker {
    load(): Promise<void>;
    loadLanguage(lang: string): Promise<void>;
    initialize(lang: string): Promise<void>;
    recognize(image: Buffer | string): Promise<RecognizeResult>;
    terminate(): Promise<void>;
  }

  export function createWorker(): TesseractWorker;
}
