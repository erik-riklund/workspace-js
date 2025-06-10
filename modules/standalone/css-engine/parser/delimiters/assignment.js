import { ParsingError } from '../errors'

/**
 * ?
 * 
 * @param {CssParserState} state
 */
export const handleAssignmentOperator = (state) =>
{
  if (state.isSelector || state.customProperty)
  {
    // Assignment operators inside attribute selectors and custom property declarations are
    // ignored. In these cases, the assignment operator is simply added to the buffer.

    state.buffer += '=';

    return; // early exit > inside an attribute selector.
  }

  if (state.isProperty)
  {
    // The parser believes we’re collecting a property value, but we have encountered an
    // assignment operator. This usually means that the property value wasn't properly
    // terminated with a line break.

    throw new ParsingError('Missing line break after property value', state);
  }

  // The next step is to ensure that the property declaration is inside a block.
  // We do this by accessing the last block in the stack, which is the current block.

  const currentBlock = state.stack[state.stack.length - 1];

  if (!currentBlock)
  {
    throw new ParsingError('Property declaration outside block', state);
  }

  if (!state.buffer.trim())
  {
    // The parser expects the buffer to contain the name of the property being collected,
    // but the buffer is empty. This indicates a syntax error - a property name is missing.

    throw new ParsingError('Unexpected assignment operator', state);
  }

  // Update the parser state to indicate that we are collecting a property value.
  // The property name is stored in the current state object until the value has been collected.

  state.isProperty = true;
  state.currentProperty = state.buffer.trim();

  state.buffer = '';
}