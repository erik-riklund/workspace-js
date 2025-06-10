/**
 * An error thrown by the CSS parser when a syntax error is encountered.
 */
export class ParsingError extends Error
{
  /**
   * @param {string} message
   * @param {CssParserState} state
   */
  constructor(message, state)
  {
    super(`<CSS-engine> Parsing error:\n${message}` +
      ` @ line ${state.currentLine}, column ${state.currentColumn}.`
    );
    this.name = 'ParsingError';
  }
}