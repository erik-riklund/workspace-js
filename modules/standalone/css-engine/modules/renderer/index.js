import { renderBlock } from './block'

/**
 * Renders an abstract syntax tree into a CSS string.
 * 
 * @param {CssEngine.AbstractTree} tree
 */
export const renderTreeToString = (tree) => 
{
  /** @type {CssEngine.RenderState} */
  const state = { output: {} };

  for (const block of tree)
  {
    renderBlock(state, block);
  }

  const groups = Object.entries(state.output);
  const result = groups.map(([context, blocks]) =>
    blocks.length === 0 ? '' : (
      context === 'root' ? blocks.join('') : `${context}{${blocks.join('')}}`
    )
  );

  return result.join('');
}

/**
 * Represents an error that occurs during the rendering of the CSS tree.
 */
export class RenderingError extends Error
{
  /**
   * @param {string} message
   * @param {CssEngine.Block} block
   */
  constructor(message, block)
  {
    const { start } = block.metadata ?? {};

    super(`Rendering error: ${message} @ line ${start?.line} (column ${start?.column}).`);

    this.name = 'RenderingError';
  }
}