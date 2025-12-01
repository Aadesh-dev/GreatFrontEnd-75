type Element = { tag: string; children: Array<string | Element> };

export default function serializeHTML(element: Element): string {
  const lines: Array<string> = [];

    function serialize(node: Element, level = 0) {
        const indent = '\t'.repeat(level);
        lines.push(`${indent}<${node.tag}>`);

        const children = Array.isArray(node.children) ? node.children : [];

        for (const child of children) {
            if (typeof child === 'string') {
                lines.push(`${'\t'.repeat(level + 1)}${child}`);
            } else {
                serialize(child, level + 1);
            }
        }

        lines.push(`${indent}</${node.tag}>`);
    }

    serialize(element, 0);
    return lines.join('\n');
}