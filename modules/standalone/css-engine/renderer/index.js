import { RenderingError } from './errors'

/**
 * Performs rendering on the provided tree, returning the output as a string.
 * 
 * @param {CssParserAbstractTree} tree
 * @returns {string}
 */
export const renderTreeToString = (tree) =>
{
  /** @type {CssRenderState} */
  const state = { output: { root: [] } };

  for (const block of tree)
  {
    renderBlock('root', block, state);
  }

  let output = '';

  for (const [context, content] of Object.entries(state.output))
  {
    output += context === 'root' ? content.join('') : `${ context }{${ content.join('') }}`;
  }

  return output;
}

/**
 * @param {string} context
 * @param {CssParserBlock} block
 * @param {CssRenderState} state
 * @param {string} parent
 */
const renderBlock = (context, block, state, parent = '') =>
{
  if (blockHasMediaQuery(block))
  {
    if (block.selectors.length > 1)
    {
      throw new RenderingError('Selectors mixed with media query', block);
    }

    if (blockSelectorIsResponsiveMediaQuery(block)
      && contextContainsResponsiveMediaQuery(context))
    {
      throw new RenderingError('Nested responsive media queries', block);
    }

    if (blockSelectorIsColorSchemeMediaQuery(block)
      && contextContainsColorSchemeMediaQuery(context))
    {
      throw new RenderingError('Nested color scheme media queries', block);
    }

    context = appendMediaQueryToContext(context, block.selectors[0]);

    if (!state.output[context])
    {
      state.output[context] = [];
    }

    if (block.properties?.length > 0)
    {
      if (!parent)
      {
        throw new RenderingError('Property declaration outside block', block);
      }

      state.output[context].push(
        `${ parent }{${ renderProperties(block.properties) }}`
      );
    }
  }
  else
  {
    for (let i = 0; i < block.selectors.length; i++)
    {
      const selector = block.selectors[i];

      if (selector.startsWith('&'))
      {
        block.selectors[i] = `${ parent }${ selector.slice(1) }`;
      }
      else
      {
        block.selectors[i] = parent ? `${ parent } ${ selector }` : selector;
      }
    }

    if (block.properties?.length > 0)
    {
      state.output[context].push(
        `${ block.selectors.join(',') }{${ renderProperties(block.properties) }}`
      );
    }
  }

  if (block.children)
  {
    for (const child of block.children)
    {
      for (const selector of block.selectors)
      {
        renderBlock(context, child, state,
          selector.startsWith('@') ? parent : selector
        );
      }
    }
  }
}

/**
 * @param {CssParserBlock} block
 */
const blockHasMediaQuery = (block) =>
{
  return block.selectors.some(
    selector => selector.startsWith('@media ')
  );
}

/**
 * @param {CssParserBlock} block
 */
const blockSelectorIsResponsiveMediaQuery = (block) =>
{
  return block.selectors.some(selector =>
    selector.startsWith('@media ') && selector.includes('-width:')
  );
}

/**
 * @param {string} context
 */
const contextContainsResponsiveMediaQuery = (context) =>
{
  return context.includes('-width:');
}

/**
 * @param {CssParserBlock} block
 */
const blockSelectorIsColorSchemeMediaQuery = (block) =>
{
  return block.selectors.some(selector =>
    selector.startsWith('@media ') && selector.includes('-color-scheme:')
  );
}

/**
 * @param {string} context
 */
const contextContainsColorSchemeMediaQuery = (context) =>
{
  return context.includes('-color-scheme:');
}

/**
 * @param {string} context
 * @param {string} mediaQuery
 */
const appendMediaQueryToContext = (context, mediaQuery) =>
{
  if (context.startsWith('@media '))
  {
    return `${ context }and${ mediaQuery.replace(/^@media\s+/, '') }`;
  }

  return mediaQuery;
}

/**
 * @param {CssPropertyDeclaration[]} properties
 */
const renderProperties = (properties = []) =>
{
  const renderedProperties = [];

  if (properties)
  {
    for (const property of properties)
    {
      if (!property.key.startsWith('!'))
      {
        renderedProperties.push(`${ property.key }:${ property.value }`);
      }
    }
  }

  return renderedProperties.join(';');
}