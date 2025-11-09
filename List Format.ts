//Refined solution
export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean },
): string {
  // 1️⃣ Clean & preprocess
  let finalItems = items.filter(Boolean); // remove falsy values

  if (options?.unique) {
    finalItems = [...new Set(finalItems)];
  }

  if (options?.sorted) {
    finalItems = [...finalItems].sort();
  }

  // 2️⃣ Handle length limit
  const validLength = options?.length && options.length > 0;
  const visibleItems = validLength
    ? finalItems.slice(0, options.length)
    : finalItems;

  const remainingCount = validLength
    ? finalItems.length - visibleItems.length
    : 0;

  // 3️⃣ Format output
  if (visibleItems.length === 0) return "";
  if (visibleItems.length === 1) return visibleItems[0];
  if (remainingCount > 0) {
    return `${visibleItems.join(", ")} and ${remainingCount} ${
      remainingCount > 1 ? "others" : "other"
    }`;
  }

  // Last two joined with 'and'
  const last = visibleItems.pop();
  return `${visibleItems.join(", ")} and ${last}`;
}

//Initial solution
export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean },
): string {
  let result = "";
  let finalItems = items.filter(item => item);
  if (options?.unique) {
    finalItems = Array.from(new Set(finalItems));
  }

  if (options?.sorted) {
    finalItems.sort();
  }

  let lastIndex = finalItems.length - 1;
  if (options?.length && options.length > 0) {
    lastIndex = Math.min(options.length, finalItems.length) - 1;
  }

  for (let i = 0; i <= lastIndex; i++) {
    result += finalItems[i];

    if (i === lastIndex - 1 && lastIndex === finalItems.length - 1) {
      result += " and ";
    } else if (i < lastIndex) {
      result += ", ";
    }
  }

  if (lastIndex < finalItems.length - 1) {
    const remaining = finalItems.length - 1 - lastIndex;
    result += ` and ${remaining} ${remaining > 1 ? "others" : "other"}`;
  }

  return result;
}