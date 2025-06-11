import { makeParserState } from '.'

declare global
{
  namespace CssEngine
  {
    /**
     * ?
     */
    type AbstractTree = Array<Block>;

    /**
     * ?
     */
    interface Block
    {
      selectors: string[],
      properties?: Property[],
      rawProperties?: RawProperty[],
      children?: AbstractTree,

      metadata: { line: number }
    }

    /**
     * ?
     */
    type Property = { key: string, value: string };

    /**
     * ?
     */
    type RawProperty = string;

    /**
     * ?
     */
    type ParserState = ReturnType<typeof makeParserState>;
  }
}