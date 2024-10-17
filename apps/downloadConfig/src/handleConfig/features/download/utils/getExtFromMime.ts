import extName from 'ext-name';
import type { Response } from 'node-fetch';

export function getExtFromMime(response: Response) {
  const contentType = response.headers.get('content-type');
  const exts: Record<string, string>[] = contentType ? extName.mime(contentType) : [];

  return exts.length === 1 ? exts[0].ext : null;
}
