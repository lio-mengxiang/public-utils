import { Transform } from 'node:stream';

/**
 * example:
 * throughObj((chunk, enc, callback) => {
 *    callback(null, chunk);
 * })
 */
export function throughObj(transform, options = {}) {
  if (typeof transform !== 'function') {
    transform = (chunk, enc, cb) => cb(null, chunk);
  }
  const t2 = new Transform({ objectMode: true, highWaterMark: 16, transform });

  t2._transform = transform;

  return t2;
}
