import { ParsingError } from '..'

/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleClosingBrace = (state) =>
{
  if (state.stack.length === 0 || state.currentPropertyName)
  {
    throw new ParsingError('Unexpected closing brace', state);
  }

  const block = state.stack.pop();

  block.metadata.end = {
    line: state.currentLine, column: state.currentColumn
  };

  state.buffer = '';
}