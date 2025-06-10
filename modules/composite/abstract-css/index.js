import { makeEngine } from 'module/css-engine'
import { abstractSelectorsPlugin } from './plugin'

/**
 * Creates a new engine function that enables the use of plain-language selectors.
 * 
 * @param {CssEnginePlugin[]} plugins
 */
export const makeAbstractCssEngine = (plugins = []) => 
{
  const engine = makeEngine([abstractSelectorsPlugin, ...plugins]);

  /**
   * @param {string} input
   */
  return (input) => engine(input);
}