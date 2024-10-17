import type { Response } from 'node-fetch';

export function showDownloadProgress(response: Response, handleProgress: (progress: number) => void) {
  // Total bytes received and the content length (if available)
  const totalBytes =
    typeof response.headers.get('content-length') === 'string' ? parseInt(response.headers.get('content-length') as string, 10) : NaN;
  let receivedBytes = 0;

  if (totalBytes) {
    // Handle data events and pipe to file stream
    response.body?.on('data', (chunk) => {
      receivedBytes += chunk.length;
      const progress = totalBytes ? Math.round((receivedBytes / totalBytes) * 100) : 0;
      handleProgress(progress);
    });
  }
}
