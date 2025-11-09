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