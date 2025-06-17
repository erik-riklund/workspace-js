import { parseSelector } from './helpers'
import * as s from './handlers/selectors'

/**
 * ?
 * 
 * @type {Record<string, [(segments: Record<string, string>)=>string, string[]]>}
 */
const selectorMap =
{
  // Identifier selectors are classes and unique identifiers.
  // We call them 'group' and 'unique' selectors to use natural, non-technical language.

  '{group,unique} *': [
    s.handleIdentifierSelector, ['selector', 'name']
  ],

  // Attribute selectors can be used to match elements by attributes,
  // either by presence or based on values.

  'attribute * [is missing]': [
    s.handleAttributeSelector, ['name', 'keyword']
  ],
  'attribute * {is,is not} **': [
    s.handleAttributeValueSelector, ['name', 'keyword', 'value']
  ],

  // Relationship selectors can be used to match elements by their relationship to other elements.
  // They increase the specificity of the selector, reducing risk of collisions.

  '{child,sibling,adjacent,descendant} {element,group} *': [
    s.handleRelationshipSelector, ['selector', 'type', 'name']
  ],

  //

  'device {mobile,tablet,laptop,desktop}': [
    s.handleDeviceSelector, ['device']
  ],
  'device [mobile,tablet,laptop,desktop] .. [mobile,tablet,laptop,desktop]': [
    s.handleDeviceRangeSelector, ['fromDevice', 'toDevice']
  ],

  // The scope selector can be used to create a custom scope.
  // This is useful for creating styles that only apply within a specific component.

  'scope *': [
    s.handleScopeSelector, ['name']
  ],

  // State selectors can be used to match elements using group-based states.
  //
  // IMPORTANT: These should not be confused with pseudo-class selectors.

  'state {is,is not} *': [
    s.handleStateSelector, ['keyword', 'state']
  ],

  // When selectors can be used to match elements using pseudo-classes. Some of the classes
  // have readable aliases available, such as `focused within` instead of `focus-within` and
  // `hovered` instead of `hover`.
  //
  // IMPORTANT: These should not be confused with group-based states.

  'when [not] *': [
    s.handleWhenSelector, ['keyword', 'state']
  ],

  // Context selectors can be used to match elements based on descendant elements or groups.

  '{with,without} {child,sibling,adjacent,descendant} {element,group} *': [
    s.handleContextSelector, ['selector', 'relationship', 'type', 'name']
  ]
};

/**
 * ?
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