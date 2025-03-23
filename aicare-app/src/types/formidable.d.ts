declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface File {
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
    size: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export class IncomingForm {
    constructor(
      options?: Partial<{
        multiples: boolean;
        uploadDir: string;
        keepExtensions: boolean;
      }>
    );
    parse(
      req: IncomingMessage,
      callback?: (err: Error | null, fields: Fields, files: Files) => void
    ): void;
  }
}
