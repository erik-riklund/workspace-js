/**
 * ?
 * 
 * @param {CssEngine.AbstractTree} tree
 * @param {CssEngine.TransformPlugin[]} plugins
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
 * @param {CssEngine.Block} block
 */
export const makeMutableBlock = (block) =>
{
  block.properties = block.properties || [];

  return {
    /**
     * Return a copy of the block's current selectors.
     */
    getSelectors: () =>
    {
      return [...block.selectors];
    },

    /**
     * Replace the block's current selectors with the given new selectors.
     * 
     * @param {string[]} newSelectors
     */
    setSelectors: (newSelectors) =>
    {
      block.selectors = [...newSelectors];
    },

    /**
     * Set the property with the specified key to the provided value.
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
        block.properties.push({ key, value });
      }
    },

    /**
     * Remove the property with the specified key.
     * 
     * @param {string} key
     */
    removeProperty: (key) =>
    {
      block.properties = block.properties.filter(
        property => property.key !== key
      );
    }
  }
}