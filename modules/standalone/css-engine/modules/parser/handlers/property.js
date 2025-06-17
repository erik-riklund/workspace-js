/**
 * @param {CssEngine.ParserState} state
 */
export const handleProperty = (state) =>
{
  const currentLine = state.currentLine;

  if (!currentLine.endsWith(',') && state.nextLine !== '{')
  {
    // Based on the checks made, we assume that the current line is a property.
    // Now we need to check if the property is inside a block.

    if (!state.currentBlock && state.nextLine !== '}')
    {
      throw new Error('Property declaration outside block');
    }

    // The extra check below is used to only run if there is an active block.
    // We don't throw an error here to let the error be caught later in the chain.

    if (state.currentBlock)
    {
      state.currentBlock.rawProperties = state.currentBlock.rawProperties || [];

      state.currentBlock.rawProperties.push(
        (currentLine.startsWith('!') ? handleCustomProperty(state) : currentLine)
      );

      state.buffer = [];
    }
  }
}

/**
 * @param {CssEngine.ParserState} state
 * @returns {CssEngine.RawProperty}
 */
const handleCustomProperty = (state) =>
{
  let content = '';

  while (state.currentLine)
  {
    const currentLine = state.currentLine;
    content += ` ${currentLine}`;

    if (currentLine.endsWith('.'))
    {
      break; // a period marks the end of the custom property.
    }

    state.currentLineIndex++;
  }

  return content.trim();
}