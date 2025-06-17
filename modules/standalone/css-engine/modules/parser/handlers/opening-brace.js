/**
 * @param {CssEngine.ParserState} state
 */
export const handleOpeningBrace = (state) =>
{
  if (state.buffer.length === 0)
  {
    // An opening brace '{' was encountered without any preceding selectors.

    throw new Error('Unexpected opening brace');
  }

  /** @type {CssEngine.Block} */
  const block = {
    selectors: state.buffer.map(line => line.replace(/,$/, '')),
    metadata: { line: state.currentLineIndex + 1 }
  };

  // Depending on whether this is a root-level block or a nested block, we either add it
  // to the root of the tree or append it as a child of the parent block. In either case,
  // we push the block onto the stack to keep the hierarchy of any nested blocks intact.

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
  state.buffer = [];
}