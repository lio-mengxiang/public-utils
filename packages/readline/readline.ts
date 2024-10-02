import { createReadStream } from "node:fs";
import split from "split";
import type { PathLike } from "node:fs";

export const readFileByLine = (
  path: PathLike,
  handleData: (chunk: Buffer | string) => void
) => {
  createReadStream(path).pipe(split()).on("data", handleData);
};
