import { createTreeFromString } from './parser'
import { transformTree } from './transformer'
import { renderTreeToString } from './renderer'

/**
 * ?
 * 
 * @param {CssEnginePlugin[]} plugins
 */
export const makeEngine = (plugins) =>
{
  const inputPlugins = plugins.filter(
    (plugin) => plugin.stage === 'input'
  );
  const transformPlugins = plugins.filter(
    (plugin) => plugin.stage === 'transform'
  );
  const outputPlugins = plugins.filter(
    (plugin) => plugin.stage === 'output'
  );

  // ...

  /**
   * @param {string} input
   * @returns {string}
   */
  return (input) =>
  {
    // Execute each of the provided input plugins, in the order they were provided.
    // The result of each plugin is validated, to ensure that a string is returned.

    for (const plugin of inputPlugins)
    {
      const result = plugin.handler(input);

      if (typeof result !== 'string')
      {
        throw new Error('Input plugins must return a string');
      }

      input = result;
    }

    // Parse the input string into an abstract tree structure. The tree structure
    // is then traversed and transformed using the provided transform plugins.

    const tree = createTreeFromString(input);
    transformTree(tree, transformPlugins);

    // Renders the abstract tree structure into a string using the provided output plugins.
    // The result of each plugin is validated, to ensure that a string is returned.

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

    return output; // The final output string.
  }
}