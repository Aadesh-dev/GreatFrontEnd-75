export default function promiseAll<T extends readonly unknown[] | []>(
  iterable: T,
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  type Result = { -readonly [P in keyof T]: Awaited<T[P]> };

  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let resolvedCount = 0;
    const totalPromises = iterable.length;

    // Handle empty array case
    if (totalPromises === 0) {
      resolve(results as Result);
      return;
    }

    // Process each item in the iterable
    iterable.forEach((item, index) => {
      // Wrap in Promise.resolve to handle both promises and non-promises
      Promise.resolve(item)
        .then((value) => {
          // Store result at the correct index to preserve order
          results[index] = value;
          resolvedCount++;

          // If all promises have resolved, resolve the outer promise
          if (resolvedCount === totalPromises) {
            resolve(results as Result);
          }
        })
        .catch((error) => {
          // If any promise rejects, reject the outer promise immediately
          reject(error);
        });
    });
  });
}