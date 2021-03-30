import {puglet} from './puglet';
import {createHtml} from './createHtml';

describe('puglet', () => {
  it('should return a html string from template', () => {
    const textExpr = 'span.blu this a blue text';
    const html = puglet(textExpr);
    const dom = createHtml(html);

    expect(dom?.nodeName).toBe('SPAN');
    expect(dom?.classList.contains('blu')).toBeTrue();
    expect(dom?.innerText).toBe('this a blue text');
  });
});
