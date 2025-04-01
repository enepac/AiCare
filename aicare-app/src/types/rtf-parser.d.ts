declare module "rtf-parser" {
  export function parseString(
    input: Buffer | string,
    callback: (err: Error | null, doc: unknown) => void
  ): void;
}
