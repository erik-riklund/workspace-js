import { ParsingError } from '..'

/**
 * Responsible for handling the opening brace `{`.
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleOpeningBrace = (state) =>
{
  const selector = state.buffer.trim();

  if (selector.length === 0)
  {
    throw new ParsingError('Unexpected opening brace', state);
  }

  const block = {
    selectors: selector.split(',').map(selector => selector.trim()),
    metadata: { start: { line: state.currentLine, column: state.currentColumn } }
  };

  if (state.stack.length > 0)
  {
    const parent = state.stack[state.stack.length - 1];

    parent.children = parent.children ? [...parent.children, block] : [block];
  }
  else
  {
    state.tree.push(block); // root-level block.
  }

  state.stack.push(block);

  state.isNestedSelector = false;
  state.buffer = '';
}