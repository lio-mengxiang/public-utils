export function writeWaitingPercent(p: string | number) {
  // clear the last line in the terminal
  process.stdout.clearLine(0);
  // Move cursor to start of the line
  process.stdout.cursorTo(0);
  // the waiting percentage passed
  process.stdout.write(`waiting ... ${p}%`);
}
