/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleDoubleQuote = (state) => 
{
  if (state.isStringLiteral)
  {
    state.buffer += '"';

    state.isStringLiteral = (
      state.buffer[state.buffer.length - 2] === '\\'
    );
  }
  else
  {
    state.isStringLiteral = true;

    state.buffer += '"';
  }
}