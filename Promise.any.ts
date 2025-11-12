export default function promiseAny<T>(iterable: Array<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const totalPromises = iterable.length;
    const rejections: any[] = [];
    let rejectedCount = 0;

    if (totalPromises === 0) {
      reject(new AggregateError([]));
    }

    iterable.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        resolve(value);
      }).catch((error) => {
        rejections[index] = error;
        rejectedCount++;

        if (rejectedCount === totalPromises) {
          reject(new AggregateError(rejections));
        }
      })
    });
  });
}