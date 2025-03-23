declare module "mime-types" {
  export function lookup(filename: string): string | false;
  export function contentType(filename: string): string | false;
  export function extension(type: string): string | false;
  export function charset(type: string): string | false;
}
