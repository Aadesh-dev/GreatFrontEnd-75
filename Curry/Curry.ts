export default function curry<F extends (...args: any[]) => any>(
  func: F,
) {
  // curried accepts a partial list of parameters; exact tuple typing for curried functions
  // is complicated, so we use any[] for the partial args but keep `this` typed.
  function curried(this: ThisParameterType<F>, ...args: any[]): any {
    const context = this;
    if (args.length >= func.length) {
      // args should match Parameters<F> at this point
      return func.apply(context, args as Parameters<F>);
    } else {
      return function (this: ThisParameterType<F>, ...args2: any[]): any {
        return curried.apply(context, args.concat(args2));
      };
    }
  }

  return curried;
}