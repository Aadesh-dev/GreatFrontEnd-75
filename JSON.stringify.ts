export default function jsonStringify(value: unknown): string {
  // primitives + null
  if (value === null || typeof value !== "object") {
    if (typeof value === "string") {
      return `"${String(value)}"`;
    }
    return String(value);
  }

  // arrays
  if (Array.isArray(value)) {
    const items = [];
    for (const item of value) {
      items.push(jsonStringify(item));
    }
    return "[" + items.join(",") + "]";
  }

  // plain objects
  const obj = value as Record<string, unknown>;
  const entries: string[] = [];

  for (const key of Object.keys(value)) {
    const stringifiedEntry = `"${key}":` + jsonStringify(obj[key]);
    entries.push(stringifiedEntry);
  }
  return "{" + entries.join(",") + "}";
}