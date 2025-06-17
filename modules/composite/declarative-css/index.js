import { makeEngine } from 'module/css-engine'
import { reusable } from 'module/css-engine/plugins/reusable'

import { handleProperty } from './property'
import { handleSelectors } from './selector'

/**
 * Creates a CSS engine that supports declarative CSS syntax.
 * 
 * @param {CssEngine.Plugin[]} plugins
 */
export const createDeclarativeEngine = (plugins = []) =>
{
  return makeEngine(
    [
      ...reusable({}),
      declarativeCssPlugin,

      ...plugins
    ]
  );
}

/**
 * A plugin that transforms declarative CSS properties and selectors into standard CSS.
 * 
 * @type {CssEngine.TransformPlugin}
 */
const declarativeCssPlugin =
{
  stage: 'transform',

  handler: (block) =>
  {
    try
    {
      block.setSelectors(
        handleSelectors(block.getSelectors())
      );

      block.handleRawProperties(
        (content) =>
        {
          const properties = handleProperty(content);

          if (Array.isArray(properties))
          {
            for (const { key, value } of properties)
            {
              block.setProperty(key, value);
            }
          }
        }
      );
    }
    catch (error)
    {
      throw new Error(
        `${error.message} (line ${block.metadata.line})`
      );
    }
  }
}