// Initial solution
export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  // 1️⃣ Handle reference equality (fast path)
  if (valueA === valueB) {
    return true;
  }

  // 2️⃣ Handle null (because typeof null === 'object')
  if (valueA === null || valueB === null) {
    return false;
  }

  // 3️⃣ Handle non-objects (primitives that aren't equal)
  if (typeof valueA !== 'object' || typeof valueB !== 'object') {
    return false;
  }

  // 4️⃣ Handle arrays
  if (Array.isArray(valueA) !== Array.isArray(valueB)) return false;
  if (Array.isArray(valueA) && Array.isArray(valueB)) { // Can also check if any one is an array. Both are checked just to satisfy TS.
    if (valueA.length !== valueB.length) {
      return false;
    }

    for (let i = 0; i < valueA.length; i++) {
      const areEqual = deepEqual(valueA[i], valueB[i]);
      if (!areEqual) {
        return false;
      }
    }

    return true;
  }

  // 5️⃣ Handle plain objects
  const entriesA = Object.entries(valueA);
  const entriesB = Object.entries(valueB);

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (let i = 0; i < entriesA.length; i++) {
    const areEqual = deepEqual(entriesA[i], entriesB[i]);
    if (!areEqual) {
      return false;
    }
  }

  return true;
}
