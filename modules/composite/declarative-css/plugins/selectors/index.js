import * as s from './handlers'
import { parseSelector } from './helpers'

/**
 * Defines the mapping between selectors and handlers.
 * 
 * @type {Record<string, [(segments: Record<string, string>)=>string, string[]]>}
 */
const selectorMap =
{
  // Attribute selectors can be used to apply styles based on
  // the presence or value of attributes.

  'attribute * [is missing]': [
    s.handleAttributeSelector, ['name', 'keyword']
  ],
  'attribute * {is,is not} **': [
    s.handleAttributeValueSelector, ['name', 'keyword', 'value']
  ],

  // The base selector can be used to match the root element.

  'base': [s.handleBaseSelector, []],

  // Relationship selectors can be used to match descendants of other elements.

  '{child,sibling,adjacent,descendant} {element,group} *': [
    s.handleRelationshipSelector, ['selector', 'type', 'name']
  ],

  // Device selectors can be used to apply styles based on screen size.

  'device {mobile,tablet,laptop,desktop}': [
    s.handleDeviceSelector, ['device']
  ],
  'device [mobile,tablet,laptop,desktop] .. [mobile,tablet,laptop,desktop]': [
    s.handleDeviceRangeSelector, ['fromDevice', 'toDevice']
  ],

  // Identifier selectors are classes and unique identifiers.

  '{group,unique} *': [
    s.handleIdentifierSelector, ['selector', 'name']
  ],

  // The scope selector can be used to create styles that only
  // apply within a specific context.

  'scope *': [s.handleScopeSelector, ['name']],

  // State selectors can be used to match elements using custom group-based states.

  'state {is,is not} *': [
    s.handleStateSelector, ['keyword', 'state']
  ],

  // When selectors can be used to target pseudo-classes.

  'when [not] *': [s.handleWhenSelector, ['keyword', 'state']],

  // Context selectors can be used to match elements based on
  // the presence of descendant elements or groups.

  '{with,without} {child,sibling,adjacent,descendant} {element,group} *': [
    s.handleContextSelector, ['selector', 'relationship', 'type', 'name']
  ]
};

/**
 * A plugin that transforms declarative CSS selectors into standard CSS.
 * 
 * @type {CssEngine.TransformPlugin}
 */
export const selectorsPlugin =
{
  stage: 'transform',

  handler: (block) =>
  {
    try
    {
      const selectors = block.getSelectors();

      block.setSelectors(handleSelectors(selectors));
    }
    catch (error)
    {
      throw new Error(
        `${error.message} (line ${block.metadata.line})`
      );
    }
  }
}

/**
 * Transforms the given selectors into standard CSS.
 * 
 * @param {string[]} selectors
 * @return {string[]}
 */
export const handleSelectors = (selectors) =>
{
  let result = [];

  for (const selector of selectors)
  {
    for (const [pattern, [handler, labels]] of Object.entries(selectorMap))
    {
      const parsedSelector = parseSelector(pattern, labels, selector);

      if (parsedSelector)
      {
        result.push(handler(parsedSelector));

        break; // move on to the next selector.
      }
    }
  }

  return result;
}