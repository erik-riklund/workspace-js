/**
 * Transforms the abstract syntax tree by applying a series of plugins.
 * 
 * @param {CssPipeline.AbstractTree} tree
 * @param {CssPipeline.TransformPlugin[]} plugins
 */
export const transformTree = (tree, plugins) =>
{
  for (const block of tree)
  {
    try
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
    catch (error)
    {
      throw new Error(
        `Transformation error: ${error.message}` +
        (block.metadata ? ` @ line ${block.metadata.start.line}` : '')
      );
    }
  }
}

/**
 * Creates a mutable representation of a CSS block for transformations.
 * 
 * @param {CssPipeline.Block} block
 */
export const makeMutableBlock = (block) =>
{
  block.properties = block.properties || [];

  return {
    /**
     * Checks whether the block has children.
     */
    hasChildren: () =>
    {
      return block.children?.length > 0;
    },

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
     * Checks whether the block has a property with the specified key.
     * 
     * @param {string} key
     */
    hasProperty: (key) => 
    {
      return block.properties.some(property => property.key === key)
    },

    /**
     * Return the value associated with the specified key,
     * or `undefined` if it does not exist.
     * 
     * @param {string} key
     * @returns {string | undefined}
     */
    getProperty: (key) =>
    {
      return block.properties.find(property => property.key === key)?.value;
    },

    /**
     * Return a copy of the block's properties.
     */
    getProperties: () =>
    {
      return [...block.properties.map(property => ({ ...property }))];
    },

    /**
     * Set the property with the specified key to the provided value.
     * 
     * @param {string} key
     * @param {string} value
     */
    setProperty: (key, value) =>
    {
      const property = block.properties
        .find(property => property.key === key);

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
      block.properties = block.properties
        .filter(property => property.key !== key);
    }
  }
}