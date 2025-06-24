import { makePipeline } from 'module/css-pipeline'

import { propertiesPlugin } from './plugins/properties'
import { selectorsPlugin } from './plugins/selectors'
import { createReusablesPlugin } from 'module/css-pipeline/plugins/reusables'

/**
 * Creates a new declarative CSS engine, adding the provided
 * plugins to its transformation pipeline.
 * 
 * @param {CssPipeline.Plugin[]} plugins
 */
export const createDeclarativeEngine = (plugins = []) =>
{
  const declarativeCssPlugins = [
    ...createReusablesPlugin(), selectorsPlugin, propertiesPlugin
  ];

  return makePipeline([...declarativeCssPlugins, ...plugins]);
}