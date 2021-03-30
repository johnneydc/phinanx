export function puglet(textExpr: string): string {
  const lines = textExpr.split('\n');
  const parsedLines = [];

  for (const line of lines) {
    const textParts = line.split(' ');
    const restOfParts = textParts.slice(1);

    const startTag = evaluateHtmlTag(textParts[0]);
    const endTag = `</${startTag.tag}>`;

    parsedLines.push(`${startTag.html}${restOfParts.join(' ')}${endTag}`);
  }

  return parsedLines.join('\n');
}

function evaluateHtmlTag(text: string): HtmlTag {
  const textParts = text.trim().split('.');
  if (textParts.length > 1) {
    return {
      tag: textParts[0],
      html: `<${textParts[0]} class="${textParts.slice(1).join(' ')}">`
    };
  } else {
    return {
      tag: textParts[0],
      html: `<${textParts[0]}>`
    };
  }
}

interface HtmlTag {
  tag: string;
  html: string;
}
