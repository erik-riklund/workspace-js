import { makeEngine } from 'module/css-engine'
import { selectorsPlugin } from './plugins/selectors'

/**
 * Creates a CSS engine that supports declarative CSS syntax.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const createDeclarativeEngine = (plugins = []) =>
{
  return makeEngine([...declarativeCssPlugins, ...plugins]);
}

/**
 * ?
 */
const declarativeCssPlugins = [selectorsPlugin];