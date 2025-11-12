type Fn = (this: any, arg: string | number) => unknown;

export default function memoize(func: Fn): Fn {
  const cache = new Map();

  return function(this, arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    } else {
      const result = func.call(this, arg);
      cache.set(arg, result);
      return result;
    }
  }
}


// With cache eviction (optional)
type Fn = (this: any, arg: string | number) => unknown;

export default function memoize(func: Fn): Fn {
  const cache = new Map();
  const maxSize = 100;

  return function(this, arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    } else {
      const result = func.call(this, arg);
      cache.set(arg, result);

      // Evict oldest entry
      if (cache.size > maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }

      return result;
    }
  }
}