/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  const arr = this, hasInitialValue = arguments.length > 1;
  if (arr.length === 0 && !hasInitialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  if (arr.length === 0) return initialValue;


  let result = hasInitialValue ? initialValue : arr[0];
  const startIndex = hasInitialValue ? 0 : 1;

  for(let i = startIndex; i < arr.length; i++) {
    if (!(i in arr)) continue;
    result = callbackFn(result, arr[i], i, arr);
  } 

  return result;
};