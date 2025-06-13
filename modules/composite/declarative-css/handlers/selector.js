import { parseSelector } from '../helpers'
import { handleIdentifierSelector } from './selectors/identifiers'
import { handleRelationshipSelector } from './selectors/relationships'

/**
 * ?
 */
const selectorHandlers =
{
  // identifiers

  'class': [handleIdentifierSelector, ['selector', 'name']],
  'unique': [handleIdentifierSelector, ['selector', 'name']],

  // relationships

  'child': [handleRelationshipSelector, ['selector', 'type', 'name']],
  'sibling': [handleRelationshipSelector, ['selector', 'type', 'name']],
  'adjacent': [handleRelationshipSelector, ['selector', 'type', 'name']]
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
    const prefix = selector.slice(0, selector.indexOf(' '));

    if (selectorHandlers[prefix])
    {
      const parsedSelector = parseSelector(
        selectorHandlers[prefix][1], selector
      );

      result = result.concat(
        selectorHandlers[prefix][0](parsedSelector)
      );
    }
  }

  return result;
}