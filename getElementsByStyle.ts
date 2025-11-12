export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string,
): Array<Element> {
  const result: Element[] = [];

  function traverse(node: Element) {
    for (const child of Array.from(node.children)) {

      const computedStyle = getComputedStyle(child);
      if (computedStyle.getPropertyValue(property) === value) {
        result.push(child);
      }

      // Recurse into descendants
      traverse(child);
    }
  }

  traverse(element);
  return result;
}

//Alternative (not recommended as getElementsByTagName is similar to document.querySelectorAll() which is prohibited in the question)
export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string,
): Array<Element> {
  const descendants = element.getElementsByTagName('*');
  
  const result = [];
  for (const el of descendants) {
    const computedStyle = getComputedStyle(el);
    if (computedStyle.getPropertyValue(property) === value) {
      result.push(el);
    }
  }
  
  return result;
}