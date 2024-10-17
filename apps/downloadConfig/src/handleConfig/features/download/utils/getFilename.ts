import type { Response } from 'node-fetch';
import { getExtension } from './getExtension';
import { getFilenameFromHeader } from './getFilenameFromHeader';
import { getFilenameFromURL } from './getFilenameFromURL';

export function getFilename(response: Response) {
  const header = response.headers.get('content-disposition');
  const filename = header ? getFilenameFromHeader(header) : getFilenameFromURL(response.url);

  return getExtension(filename, response);
}
