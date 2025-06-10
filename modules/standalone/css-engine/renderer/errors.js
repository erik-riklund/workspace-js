export class RenderingError extends Error
{
  /**
   * @param {string} message
   * @param {CssParserBlock} block
   */
  constructor(message, block)
  {
    super(`<Poise.css> Rendering error:\n${message}` +
      ` @ line ${block.metadata.startsAt.line}, column ${block.metadata.startsAt.column}.`
    );
    this.name = 'RenderingError';
  }
}