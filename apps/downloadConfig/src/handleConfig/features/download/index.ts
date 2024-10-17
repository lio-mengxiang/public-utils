import fetch from 'node-fetch';
import { createWriteStream, unlink } from 'node:fs';
import path from 'node:path';
import { getFilename, mkdirRecursiveSync, showDownloadProgress, writeWaitingPercent } from './utils';

export async function download(url: string, outputPath = './', options: { filename?: string } = {}) {
  try {
    const { filename } = options;
    const response = await fetch(url);

    // response status should be 2xx
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const fileName = filename || getFilename(response);
    const outputFilepath = path.join(outputPath, fileName);
    const fileStream = createWriteStream(outputFilepath);

    mkdirRecursiveSync(outputPath);
    // pipe the response body directly to the file stream
    response.body.pipe(fileStream);

    // if response header includes
    showDownloadProgress(response, (progressText) => writeWaitingPercent(progressText));

    return new Promise<string>((resolve, reject) => {
      fileStream.on('finish', () => {
        resolve(fileName);
      });

      // Handle file and response stream errors
      fileStream.on('error', (err: Error) => {
        fileStream.close();
        unlink(outputFilepath, () => {}); // Attempt to delete the file
        reject(err);
      });

      response.body.on('error', (err: Error) => {
        fileStream.close();
        unlink(outputFilepath, () => {}); // Attempt to delete the file
        reject(err);
      });
    });
  } catch (error) {
    console.error('Download error:', error.message);
    throw error;
  }
}
