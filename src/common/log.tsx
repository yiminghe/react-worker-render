const verbose = 1;
export function log(...args: any) {
  if (verbose) {
    console.log(...args);
  }
}
