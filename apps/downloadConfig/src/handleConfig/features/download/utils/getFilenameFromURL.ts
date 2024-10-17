import path from 'node:path';

export function getFilenameFromURL(url: string | URL) {
  return path.basename(new URL(url).pathname);
}
