import { RenderingError } from '.'

/**
 * ?
 * 
 * @param {CssEngine.RenderState} state
 * @param {CssEngine.Block} block
 * @param {string[]} parents
 */
export const renderBlock = (state, block, context = 'root', parents = []) =>
{
  if (block.selectors[0].startsWith('@media screen'))
  {
    // Responsive media queries are rendered as separate context blocks.

    if (context.includes('screen'))
    {
      throw new RenderingError(
        'Nested media queries are not supported', block
      );
    }

    if (context.includes('-color-scheme'))
    {
      throw new RenderingError(
        'Responsive media queries cannot be nested inside color scheme at-rules', block
      );
    }

    renderBlockContent(state, block.selectors[0], parents, block);
  }
  else if (block.selectors[0].startsWith('@media')
    && block.selectors[0].includes('-color-scheme'))
  {
    // Color scheme at-rules are either appended to the end of an existing
    // responsive media query, or rendered as a separate context block.

    if (context.includes('-color-scheme'))
    {
      throw new RenderingError(
        'Nested color scheme at-rules are not supported', block
      );
    }

    const targetContext = !context.startsWith('@media screen') ? block.selectors[0] :
      (context + 'and' + block.selectors[0].replace(/^[^(]+(\([^)]+\))[^)]*$/, '$1'));

    renderBlockContent(state, targetContext, parents, block);
  }
  else if (block.selectors[0].startsWith('@'))
  {
    // At-rules that are not media queries are rendered without parent selectors
    // to ensure that their properties are scoped to itself.

    if (context.startsWith('@'))
    {
      throw new RenderingError(
        'Nested at-rules are not supported', block
      );
    }

    renderBlockContent(state, block.selectors[0], [], block);
  }
  else
  {
    // Blocks that are not at-rules are rendered within the specified context,
    // which is usually 'root' or '@media screen', but it can be any at-rule.

    const selectors = block.selectors.flatMap(
      (selector) => parents.length === 0 ? [selector] :
        parents.map(parent => renderSelector(selector, parent))
    );

    renderBlockContent(state, context, selectors, block);
  }
}

/**
 * ?
 * 
 * @param {string} selector
 * @param {string} parent
 */
const renderSelector = (selector, parent) =>
{
  return selector.includes('&') ? selector.replace(/&/g, parent) : `${parent} ${selector}`;
}

/**
 * ?
 * 
 * @param {CssEngine.Property[]} properties
 */
const renderProperties = (properties) =>
{
  return properties.map(property => `${property.key}:${property.value}`).join(';');
}

/**
 * ?
 * 
 * @param {CssEngine.RenderState} state
 * @param {string} context
 * @param {string[]} selectors
 * @param {CssEngine.Block} block
 */
const renderBlockContent = (state, context, selectors, block) =>
{
  if (!state.output[context])
  {
    state.output[context] = [];
  }

  if (block.properties?.length > 0)
  {
    state.output[context].push(
      `${selectors.join(',')}{${renderProperties(block.properties)}}`
    );
  }

  if (block.children?.length > 0)
  {
    for (const child of block.children)
    {
      renderBlock(state, child, context, selectors);
    }
  }
}