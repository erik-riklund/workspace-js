import { ParsingError } from '../errors'

/**
 * @param {CssParserState} state
 */
export const handleLineBreak = (state) =>
{
  const value = state.buffer.trim();

  if (state.isProperty)
  {
    handleProperty(state, value);
  }
  else if (state.customProperty)
  {
    handleCustomProperty(state, value);
  }

  // As a line break is encountered and only single-line comments are supported,
  // the parser state is updated to signal that we're not inside a comment.

  state.isComment = false;
}

/**
 * @param {CssParserState} state
 * @param {string} value
 */
const handleProperty = (state, value) =>
{
  if (!value)
  {
    // The property was terminated by a line break without any value being specified.
    // This is handled as a syntax error, as a property must have a value.

    throw new ParsingError('Missing property value', state);
  }

  // We don't perform any validation here because we know, based on validations performed
  // earlier in the chain, that the stack is not empty. We can safely access the last block
  // in the stack, which is the current block.

  const currentBlock = state.stack[state.stack.length - 1];

  // We create a new property object and add it to the properties array of the current block.
  // The line number of the property is set to track where the property was defined in the input string.

  const property =
  {
    key: state.currentProperty,
    value: state.buffer.trim(),

    line: state.currentLine
  };

  currentBlock.properties = currentBlock.properties ?
    [...currentBlock.properties, property] : [property];

  // The parser state is updated to signal that we're no longer inside a property declaration.

  state.isProperty = false;
  state.currentProperty = '';

  state.buffer = '';
}

/**
 * @param {CssParserState} state
 * @param {string} value
 */
const handleCustomProperty = (state, value) =>
{
  if (state.buffer.replace(/[ ]+$/, '').endsWith('\n'))
  {
    if (!value)
    {
      // The custom property was terminated by double line breaks without any value
      // being specified. This is a syntax error, as a property must have a value.

      throw new ParsingError('Missing custom property value', state);
    }

    // We assign the value to the custom property by reference (the property object is
    // bound to a parent block) and update the state to indicate that we're no longer
    // inside a custom property declaration.

    state.customProperty.value = state.buffer.trim();
    state.customProperty = null;

    state.buffer = '';
  }

  else state.buffer += '\n';
}