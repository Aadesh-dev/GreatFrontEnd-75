// Basic solution
export default function squashObject(obj: Object): Object {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object") {
      const squashed = squashObject(value);
      for (const [squashedKey, squashedValue] of Object.entries(squashed)) {
        result[`${key ?? ""}${(key && squashedKey) ? "." : ""}${squashedKey ?? ""}`] = squashedValue;
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Enhanced solution
export default function squashObject<T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  function helper(value: unknown, prefix?: string) {
    // Treat null as a leaf value (do NOT recurse into null)
    if (value !== null && typeof value === "object") {
      if (Array.isArray(value)) {
        // Arrays: index each item
        value.forEach((item, idx) => {
          const key = prefix ? `${prefix}.${idx}` : `${idx}`;
          helper(item, key);
        });
      } else {
        // Plain object: iterate own enumerable keys
        for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
          // Empty key means "skip this layer"
          const nextPrefix = k === "" ? prefix : prefix ? `${prefix}.${k}` : k;
          helper(v, nextPrefix);
        }
      }
    } else {
      // Leaf value (could be undefined or null)
      // If prefix is undefined (shouldn't happen for well-formed input), use empty string
      result[prefix ?? ""] = value;
    }
  }

  // Start recursion for top-level entries (so the top-level object keys are used as prefixes)
  for (const [key, value] of Object.entries(obj)) {
    const startPrefix = key === "" ? undefined : key;
    helper(value, startPrefix);
  }

  return result;
}

//ChatGPT explanation for this solution:
//https://chatgpt.com/s/t_6914d2e7aaa08191afb455aa3d49de5f