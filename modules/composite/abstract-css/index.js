import { makeEngine } from 'module/css-engine'
import { abstractSelectorsPlugin } from './plugins/selectors'

/**
 * Creates a new engine function that enables the use of plain-language selectors.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const makeAbstractCssEngine = (plugins = []) => 
{
  const engine = makeEngine([abstractSelectorsPlugin, ...plugins]);

  /**
   * @param {string} input
   */
  return (input) => engine(input);
}