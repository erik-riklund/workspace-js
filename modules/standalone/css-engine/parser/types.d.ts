export {};

declare global
{
  interface CssParserState
  {
    tree: CssParserAbstractTree,
    stack: Array<CssParserBlock>,
    buffer: string,

    currentPosition: number,
    currentLine: number,
    currentColumn: number,
    currentProperty: string,

    isComment: boolean,
    isSelector: boolean,
    isProperty: boolean,
    isValue: boolean,

    customProperty: CssPropertyDeclaration | null
  }

  interface CssParserBlock
  {
    selectors: string[],
    properties?: CssPropertyDeclaration[],
    children?: CssParserAbstractTree,

    metadata: {
      startsAt: { line: number, column: number },
      endsAt?: { line: number, column: number }
    }
  }

  type CssParserAbstractTree = Array<CssParserBlock>;
  type CssPropertyDeclaration = { key: string, value: string, line: number };
}