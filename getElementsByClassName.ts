export default function getElementsByClassName(
  element: Element,
  classNames: string,
): Array<Element> {
  const result: Element[] = [];
  const targetClasses = classNames.trim().split(/\s+/).filter(Boolean);

  function traverse(node: Element) {
    for (const child of Array.from(node.children)) {

      // Check if child contains *all* target classes
      const hasAllClasses = targetClasses.every(cls =>
        child.classList.contains(cls)
      );

      if (hasAllClasses) {
        result.push(child);
      }

      // Recurse into descendants
      traverse(child);
    }
  }

  traverse(element);
  return result;
}

//ChatGPT explanations for this solution:
//1. https://chatgpt.com/s/t_6914d25fb4548191b74fa99cdbd9547b
//2. https://chatgpt.com/s/t_6914d284fbec8191a2a8549c92a35dcd