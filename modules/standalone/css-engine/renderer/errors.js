export class RenderingError extends Error
{
  /**
   * @param {string} message
   * @param {CssEngine.Block} block
   */
  constructor(message, block)
  {
    super(
      `<CSS-engine> Rendering error:\n${message} @ line ${block.metadata.line}.`
    );
    
    this.name = 'RenderingError';
  }
}