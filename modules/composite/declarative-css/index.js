import { makeEngine } from 'module/css-engine'

import { propertiesPlugin } from './plugins/properties'
import { reusablesPlugin } from './plugins/reusables'
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
 * The default set of declarative CSS plugins.
 * 
 * @type {CssEngine.Plugin[]}
 */
const declarativeCssPlugins = [
  reusablesPlugin, selectorsPlugin, propertiesPlugin
];