export class RenderingError extends Error
{
  /**
   * @param {string} message
   * @param {CssEngine.Block} block
   */
  constructor(message, block)
  {
    const { start } = block.metadata;

    super(`Rendering error: ${message} @ line ${start.line} (column ${start.column}).`);

    this.name = 'RenderingError';
  }
}