// import {compile} from 'pug';

import {puglet} from '../functions/puglet';

export class TerminalLine {

  private readonly textExpr: string;
  private _html?: string;
  private _lineLen?: number;
  private _text?: string;

  constructor(textExpr: string) {
    this.textExpr = textExpr;
  }

  public static new(textExpr: string): TerminalLine {
    return new TerminalLine(textExpr);
  }

  public get text(): string {
    if (this._text !== undefined) { return this._text; }

    const strippedString = this.html.replace(/(<([^>]+)>)/gi, '');

    this._text = strippedString.trim();
    return this._text;
  }

  public get lineLen(): number {
    if (this._lineLen !== undefined) { return this._lineLen; }

    this._lineLen = this._text?.trim().length;
    return this._lineLen || 0;
  }

  public get html(): string {
    if (this.textExpr.trim().length === 0) {
      return '&nbsp;';
    }

    if (!this.textExpr.startsWith('%')) {
      return `<span>${this.textExpr}</span>`;
    }

    const exprParts = this.textExpr.slice().split('');
    exprParts.shift();
    const expr = exprParts.join('');

    if (this._html) { return this._html; }

    this._html = puglet(expr);
    this._html = this._html.replaceAll('<s', '<span');
    this._html = this._html.replaceAll('</s', '</span');

    return this._html || '';
  }
}

/*
* ylw - yellow
* tang - orange
* red - red
* pnk - magenta
* vlt - violet
* blu - blue
* cyn - cyan
* grn - green
* */
