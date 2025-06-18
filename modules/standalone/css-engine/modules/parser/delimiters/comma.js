import { ParsingError } from '..'

/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleComma = (state) => 
{
  if (!state.isStringLiteral && state.isNestedSelector)
  {
    state.isNestedSelector = false;
  }

  state.buffer += ',';
}