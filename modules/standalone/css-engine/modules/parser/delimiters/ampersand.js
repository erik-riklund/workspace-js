/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleAmpersand = (state) => 
{
  if (!state.isStringLiteral)
  {
    state.isNestedSelector = true;
  }

  state.buffer += '&';
}