/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */

type ArrayValue = any | Array<ArrayValue>;

//Recursive
export default function flatten(value: Array<ArrayValue>): Array<any> {
  if (!Array.isArray(value)) return [value];

  const result = [];

  for (const item of value) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

//Iterative - To handle very deep arrays (like 10k+ levels)
export function flatten2(value: Array<ArrayValue>): Array<any> {
  const stack = [...value];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }

  return result.reverse();
}

//In-place
export function flatten3(value: Array<ArrayValue>): Array<any> {
  for (let i = 0; i < value.length; ) {
    if (Array.isArray(value[i])) {
      value.splice(i, 1, ...value[i]);
    } else {
      i++;
    }
  }

  return value;
}
