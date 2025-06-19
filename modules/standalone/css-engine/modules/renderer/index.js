import { renderBlock } from './block'

/**
 * ?
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
 * ?
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