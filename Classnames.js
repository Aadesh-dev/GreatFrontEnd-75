/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  const classes = [];

  for (const arg of args) {
    if (!arg) continue;

    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    } else {
      classes.push(String(arg));
    }
  }

  return classes.filter(Boolean).join(' ');
}
