import { ParsingError } from '../errors'

/**
 * ?
 * 
 * @param {CssParserState} state
 */
export const handleOpeningBrace = (state) =>
{
  // Extract the selector(s) from the buffer, removing any leading or trailing whitespace.
  // This could be a single selector or a comma-separated list of selectors - we don’t validate
  // the structure here. We simply need to ensure that there is at least one selector.

  const selector = state.buffer.trim();

  if (selector.length === 0)
  {
    // An opening brace '{' was encountered without any preceding selector text.
    // This is considered a syntax error — blocks must be tied to a selector.

    throw new ParsingError('Unexpected opening brace', state);
  }

  if (state.isProperty)
  {
    // The parser believes we’re inside a property value, but the line ends with a '{'
    // instead of a proper termination. This usually means a missing line break between
    // a property value and a nested block.

    throw new ParsingError('Missing line break after property value', state);
  }

  // At this point, we have a valid selector and we create a new block for it. The selector
  // is split (by comma) into an array of strings, where each string is a single selector.
  // The starting line and column of the block are set to track where the block was defined.

  const block = {
    selectors: selector.split(',').map(selector => selector.trim()),
    metadata: { startsAt: { line: state.currentLine, column: state.currentColumn } }
  };

  // Depending on whether this is a root-level block or a nested block, we either add it
  // to the root of the tree or append it as a child of the parent block. In either case,
  // we also push the block onto the stack to keep the hierarchy of any nested blocks intact.

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

  state.buffer = '';
}

/**
 * ?
 * 
 * @param {CssParserState} state
 */
export const handleClosingBrace = (state) =>
{
  if (state.stack.length === 0)
  {
    // The parser has encountered a closing brace '}' but there are no blocks to close.
    // This indicates a syntax error - a misplaced or excess closing brace.

    throw new ParsingError('Unexpected closing brace', state);
  }

  if (state.isProperty && !state.buffer.trim())
  {
    // The parser has encountered a closing brace '}' signaling the end of a block,
    // but it's currently expecting a property value.

    throw new ParsingError('Missing property value', state);
  }

  if (state.customProperty)
  {
    // Encountered a closing brace '}' while performing a custom property declaration,
    // which is a valid way to terminate it. We assign the value to the custom property
    // by reference (the property object is bound to a parent block) and update the state
    // to signal that we're no longer inside a custom property declaration.

    state.customProperty.value = state.buffer.trim();
    state.customProperty = null;
  }

  // To properly close the block, it's removed from the stack and its metadata
  // is updated to track the end position of the block in the input string.

  const block = state.stack.pop();

  block.metadata.endsAt = {
    line: state.currentLine, column: state.currentColumn
  };

  state.buffer = '';
}