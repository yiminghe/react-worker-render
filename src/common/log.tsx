const verbose = 0;
export function log(...args: any) {
  if (verbose) {
    console.log(...args);
  }
}
