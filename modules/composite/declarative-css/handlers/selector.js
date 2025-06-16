import { parseSelector } from '../helpers'

import { handleGroupIdentifierSelector } from './selectors/identifiers'
import { handleUniqueIdentifierSelector } from './selectors/identifiers'

import { handleAttributeSelector } from './selectors/attributes'
import { handleAttributeIsMissingSelector } from './selectors/attributes'
import { handleAttributeIsValueSelector } from './selectors/attributes'
import { handleAttributeIsNotValueSelector } from './selectors/attributes'

import { handleChildElementRelationshipSelector } from './selectors/relationships'
import { handleChildGroupRelationshipSelector } from './selectors/relationships'
import { handleSiblingElementRelationshipSelector } from './selectors/relationships'
import { handleSiblingGroupRelationshipSelector } from './selectors/relationships'
import { handleAdjacentElementRelationshipSelector } from './selectors/relationships'
import { handleAdjacentGroupRelationshipSelector } from './selectors/relationships'
import { handleDescendantElementRelationshipSelector } from './selectors/relationships'
import { handleDescendantGroupRelationshipSelector } from './selectors/relationships'

import { handleStateSelector } from './selectors/state'
import { handleNegatedStateSelector } from './selectors/state'

/**
 * ?
 * 
 * @type {Record<string, [(segments: Record<string, string>)=>string, string[]]>}
 */
const selectorMap =
{
  // ?

  'group **': [
    handleGroupIdentifierSelector, ['name']
  ],
  'unique **': [
    handleUniqueIdentifierSelector, ['name']
  ],

  // ?

  'attribute *': [
    handleAttributeSelector, ['name']
  ],
  'attribute * is missing': [
    handleAttributeIsMissingSelector, ['name']
  ],
  'attribute * is **': [
    handleAttributeIsValueSelector, ['name', 'value']
  ],
  'attribute * is not **': [
    handleAttributeIsNotValueSelector, ['name', 'value']
  ],

  // ?

  'child *': [
    handleChildElementRelationshipSelector, ['name']
  ],
  'child group **': [
    handleChildGroupRelationshipSelector, ['name']
  ],
  'sibling *': [
    handleSiblingElementRelationshipSelector, ['name']
  ],
  'sibling group **': [
    handleSiblingGroupRelationshipSelector, ['name']
  ],
  'adjacent *': [
    handleAdjacentElementRelationshipSelector, ['name']
  ],
  'adjacent group **': [
    handleAdjacentGroupRelationshipSelector, ['name']
  ],
  'descendant *': [
    handleDescendantElementRelationshipSelector, ['name']
  ],
  'descendant group **': [
    handleDescendantGroupRelationshipSelector, ['name']
  ],

  // ?

  'state is **': [
    handleStateSelector, ['state']
  ],
  'state is not **': [
    handleNegatedStateSelector, ['state']
  ],

  // ?
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