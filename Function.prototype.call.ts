interface Function {
  myCall(this: Function, thisArg: any, ...argArray: any[]): any;
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  // Handle null/undefined thisArg (should default to global object)
  // In strict mode, it stays null/undefined
  // In non-strict mode, it becomes globalThis
  thisArg = thisArg ?? globalThis;

  // Create a unique symbol to avoid property collision
  const uniqueKey = Symbol("fnCall");

  thisArg[uniqueKey] = this;
  const result = thisArg[uniqueKey](...argArray);
  delete thisArg[uniqueKey];

  return result;
};