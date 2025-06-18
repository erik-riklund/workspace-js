import { ParsingError } from '..'

/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleSemicolon = (state) => 
{
  if (state.isStringLiteral)
  {
    state.buffer += ';';

    return; // early exit, in a string literal.
  }

  const value = state.buffer.trim();

  if (!state.currentPropertyName || !value)
  {
    throw new ParsingError(
      'Unexpected semicolon (expected property declaration)', state
    );
  }

  const currentBlock = state.stack[state.stack.length - 1];

  if (!currentBlock)
  {
    throw new ParsingError(
      'Unexpected semicolon (outside block)', state
    );
  }

  const property = { key: state.currentPropertyName, value };

  if (!currentBlock.properties)
  {
    currentBlock.properties = [];
  }
  
  currentBlock.properties.push(property);

  state.currentPropertyName = '';
  state.buffer = '';
}