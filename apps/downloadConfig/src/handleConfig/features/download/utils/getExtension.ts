import type { Response } from 'node-fetch';
import path from 'node:path';
import { getExtFromMime } from './getExtFromMime';

export function getExtension(filename: string, response: Response) {
  if (path.extname(filename)) return filename;

  const ext = getExtFromMime(response);
  return ext ? `${filename}.${ext}` : filename;
}
