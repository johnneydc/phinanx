import {TerminalLine} from './terminal-line';
import {createHtml} from '../functions/createHtml';

describe('TerminalLine', () => {
  it('parsed line should be a valid html', () => {
    const line = new TerminalLine('%s.grn test green text');
    const html = createHtml(line.html);

    expect(html).toBeDefined();
    expect(html?.nodeName).toBe('SPAN');
    expect(html?.classList.contains('grn')).toBeTrue();
  });

  it('lineLine() should not count html tags as line length', () => {
    const line = new TerminalLine('%s.blu hello');

    expect(line.lineLen).toBe(5);
  });
});
