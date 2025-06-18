import { ParsingError } from '..'

/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleColon = (state) => 
{
  if (
    state.isAtSign ||
    state.isStringLiteral ||
    state.isNestedSelector ||
    state.stack.length === 0)
  {
    state.buffer += ':';

    return; // early exit: a string literal or nested selector.
  }

  if (state.currentPropertyName)
  {
    throw new ParsingError(
      'Unexpected colon (expected property value)', state
    );
  }

  state.currentPropertyName = state.buffer.trim();
  state.buffer = '';
}