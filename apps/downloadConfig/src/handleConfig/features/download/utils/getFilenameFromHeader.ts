import contentDisposition from 'content-disposition';

export function getFilenameFromHeader(header: string): string | null {
  const { parameters } = contentDisposition.parse(header);
  return parameters?.filename || null;
}
