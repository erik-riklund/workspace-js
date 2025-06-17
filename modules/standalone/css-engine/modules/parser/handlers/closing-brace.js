/**
 * @param {CssEngine.ParserState} state
 */
export const handleClosingBrace = (state) =>
{
  if (!state.currentBlock)
  {
    throw new Error('Unexpected closing brace');
  }

  state.stack.pop();
}