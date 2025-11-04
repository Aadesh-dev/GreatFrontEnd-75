export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isFunction(value: unknown): boolean {
  return typeof value === "function";
}

export function isObject(value: unknown): boolean {
  if (value === null) {
    return false;
  }
  
  return typeof value === "object" || typeof value === "function";
}

export function isPlainObject(value: unknown): boolean {
  // Check if value is null or not an object type
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // Get the prototype of the value
  const prototype = Object.getPrototypeOf(value);
  
  // Check if prototype is null (created via Object.create(null))
  // or if prototype is Object.prototype (plain object)
  return prototype === null || prototype === Object.prototype;
}