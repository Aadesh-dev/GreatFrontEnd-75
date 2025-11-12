export default function promisify<T>(
  func: (...args: any[]) => void,
): (this: any, ...args: any[]) => Promise<T> {
  return function(this: any, ...args: any[]) {
    return new Promise<T>((resolve, reject) => {
      func.call(this, ...args, (err: unknown, value: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }
}