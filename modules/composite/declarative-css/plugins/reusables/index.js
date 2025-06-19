import { parseSelector } from '../selectors/helpers'

/**
 * ?
 * 
 * @returns {CssEngine.TransformPlugin[]}
 */
export const createReusablesPlugin = () =>
{
  /**
   * ?
   * 
   * @type {Record<string, CssEngine.Property[]>}
   */
  const reusableBlocks = {};

  return [
    /**
     * ?
     */
    {
      stage: 'transform',

      handler: (block) =>
      {
        const selectors = block.getSelectors();

        if (selectors.some(selector => selector.startsWith('reusable ')))
        {
          if (selectors.length > 1)
          {
            throw new Error(
              'A reusable block cannot have more than one selector'
            );
          }

          if (block.hasChildren())
          {
            throw new Error(
              'A reusable block cannot have children'
            );
          }

          const { name } = parseSelector(
            'reusable *', ['name'], selectors[0]
          );

          if (name in reusableBlocks)
          {
            throw new Error(
              `Non-unique reusable block name (${name})`
            );
          }

          reusableBlocks[name] = block.getProperties();

          for (const property of reusableBlocks[name])
          {
            block.removeProperty(property.key);
          }
        }
      }
    },

    /**
     * ?
     */
    {
      stage: 'transform',

      handler: (block) =>
      {
        if (block.hasProperty('!include'))
        {
          const includes = block.getProperty('!include').value;
          const reusableBlockList = includes.split(',').map(name => name.trim());

          for (const blockName of reusableBlockList)
          {
            if (!(blockName in reusableBlocks))
            {
              throw new Error(
                `Unknown reusable block (${blockName})`
              );
            }

            for (const property of reusableBlocks[blockName])
            {
              block.setProperty(property.key, property.value);
            }
          }

          block.removeProperty('!include');
        }
      }
    }
  ];
}