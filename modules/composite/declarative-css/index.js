import { makeEngine } from 'module/css-engine'

import { propertiesPlugin } from './plugins/properties'
import { createReusablesPlugin } from './plugins/reusables'
import { selectorsPlugin } from './plugins/selectors'

/**
 * Creates a CSS engine that supports declarative CSS syntax.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const createDeclarativeEngine = (plugins = []) =>
{
  const declarativeCssPlugins = [
    ...createReusablesPlugin(), selectorsPlugin, propertiesPlugin
  ];

  return makeEngine([...declarativeCssPlugins, ...plugins]);
}