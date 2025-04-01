declare module "pdf2pic" {
  export interface ConvertOptions {
    density?: number;
    format?: "png" | "jpeg";
    width?: number;
    height?: number;
    saveFilename?: string;
    savePath?: string;
  }

  export interface ConvertResponse {
    path: string;
    name: string;
    size: number;
    page: number;
  }

  export function fromPath(
    pdfPath: string,
    options?: ConvertOptions
  ): (page: number) => Promise<ConvertResponse>;

  export function fromBuffer(
    buffer: Buffer,
    options?: ConvertOptions
  ): {
    bulk: (pages: number | number[], returnAllPages?: boolean) => Promise<ConvertResponse[]>;
  };
}
