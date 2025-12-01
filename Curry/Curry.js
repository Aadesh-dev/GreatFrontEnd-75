/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  
  return function curried(...args) {
    const context = this;
    if (args.length >= func.length) {
      return func.apply(context, args);
    } else {
      return function(...args2) {
        return curried.apply(context, args.concat(args2));
      }
    }
  }
}