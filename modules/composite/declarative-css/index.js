import { makeEngine } from 'module/css-engine'

import { propertiesPlugin } from './plugins/properties'
import { selectorsPlugin } from './plugins/selectors'

/**
 * Creates a new declarative CSS engine, adding the provided
 * plugins to its transformation pipeline.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const createDeclarativeEngine = (plugins = []) =>
{
  const declarativeCssPlugins = [selectorsPlugin, propertiesPlugin];

  return makeEngine([...declarativeCssPlugins, ...plugins]);
}