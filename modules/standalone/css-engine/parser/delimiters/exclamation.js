import { ParsingError } from '../errors'

/**
 * @param {CssParserState} state
 */
export const handleExclamationMark = (state) =>
{
  if (state.isProperty || state.customProperty)
  {
    // We are collecting a property value here, so the exclamation mark doesn't have any
    // special meaning. It's treated as being part of the property value, e.g. `!important`.

    state.buffer += '!';

    return; // early exit > move on to the next character.
  }

  // Ensure that the custom property is declared inside a block. We do this by accessing
  // the last block in the stack, which is the current block.

  const currentBlock = state.stack[state.stack.length - 1];

  if (!currentBlock)
  {
    throw new ParsingError('Custom property declaration outside block', state);
  }

  // Update the parser state to indicate that we're currently performing a custom property
  // declaration. We do this by creating a new property object, which will be added to both
  // the current state of the parser and the property list of the current block.

  state.customProperty = { key: '!', value: '', line: state.currentLine };

  currentBlock.properties = currentBlock.properties ?
    [...currentBlock.properties, state.customProperty] : [state.customProperty];
}