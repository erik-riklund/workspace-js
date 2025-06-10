/**
 * ?
 * 
 * @param {CssParserAbstractTree} tree
 * @param {CssEngineTransformPlugin[]} plugins
 */
export const transformTree = (tree, plugins) =>
{
  for (const block of tree)
  {
    const mutableBlock = makeMutableBlock(block);

    for (const plugin of plugins)
    {
      plugin.handler(mutableBlock);
    }

    if (block.children)
    {
      transformTree(block.children, plugins);
    }
  }
}

/**
 * ?
 * 
 * @param {CssParserBlock} block
 */
export const makeMutableBlock = (block) =>
{
  block.properties = block.properties || [];

  return {
    /**
     * ?
     */
    getSelectors: () =>
    {
      return [...block.selectors];
    },

    /**
     * ?
     * 
     * @param {string[]} newSelectors
     */
    setSelectors: (newSelectors) =>
    {
      block.selectors = [...newSelectors];
    },

    /**
     * ?
     * 
     * @param {string} key
     * @param {string} value
     */
    setProperty: (key, value) =>
    {
      const property = block.properties.find(
        property => property.key === key
      );

      if (property)
      {
        property.value = value;
      }
      else
      {
        block.properties.push({ key, value, line: 0 });
      }
    },

    /**
     * ?
     * 
     * @param {string} key
     * @param {(value: string) => { key: string, value: string }[]} handler
     */
    replaceProperty: (key, handler) =>
    {
      if (block.properties.some(property => property.key === key))
      {
        const newProperties = [];

        const replacements = handler(block.properties[key]);

        for (let i = 0; i < block.properties.length; i++)
        {
          if (block.properties[i].key === key)
          {
            for (const replacement of replacements)
            {
              newProperties.push({ ...replacement, line: 0 });
            }
          }
          else
          {
            newProperties.push(block.properties[i]);
          }
        }

        block.properties = newProperties;
      }
    },

    /**
     * ?
     * 
     * @param {string} key
     */
    removeProperty: (key) =>
    {
      block.properties = block.properties.filter(property => property.key !== key);
    }
  }
}