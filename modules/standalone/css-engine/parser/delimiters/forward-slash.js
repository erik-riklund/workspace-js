/**
 * @param {CssParserState} state
 */
export const handleForwardSlash = (state) =>
{
  // Single-line comments are initiated by double forward slashes. If the previous
  // character was a forward slash, the parser state is updated to indicate that
  // we're inside a comment, ignoring all input until after the next line break.

  const previousCharacter = state.buffer[state.buffer.length - 2];

  state.isComment = previousCharacter === '/';
  state.buffer = state.isComment ? '' : (state.buffer + '/');
}