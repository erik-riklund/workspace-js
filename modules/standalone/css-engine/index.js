import { createTreeFromString } from './modules/parser'
import { transformTree } from './modules/transformer'
import { renderTreeToString } from './modules/renderer'

/**
 * Creates a new engine function that uses the provided plugins to perform
 * input, transform, and output operations on a provided input string.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const makeEngine = (plugins = []) =>
{
  const inputPlugins = plugins.filter((plugin) => plugin.stage === 'input');
  const transformPlugins = plugins.filter((plugin) => plugin.stage === 'transform');
  const outputPlugins = plugins.filter((plugin) => plugin.stage === 'output');

  /**
   * @param {string} input
   * @returns {string}
   */
  return (input) =>
  {
    for (const plugin of inputPlugins)
    {
      const result = plugin.handler(input);

      if (typeof result !== 'string')
      {
        throw new Error('Input plugins must return a string');
      }

      input = result;
    }

    const tree = createTreeFromString(input);
    transformTree(tree, [...transformPlugins]);

    let output = renderTreeToString(tree);

    for (const plugin of outputPlugins)
    {
      const result = plugin.handler(output, tree);

      if (typeof result !== 'string')
      {
        throw new Error('Output plugins must return a string');
      }

      output = result;
    }

    return output;
  }
}