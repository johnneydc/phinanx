export function createHtml(htmlString: string): HTMLElement | undefined {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.children[0] as HTMLElement;
}
