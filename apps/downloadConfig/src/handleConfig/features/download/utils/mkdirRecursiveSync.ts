import { existsSync, mkdirSync } from 'node:fs';

export function mkdirRecursiveSync(dirPath: string) {
  if (existsSync(dirPath)) {
    return;
  } else {
    mkdirSync(dirPath, { recursive: true });
  }
}
