import { parseSelector } from '../helpers'
import { handleClassSelector } from './selectors/identifiers'

/**
 * ?
 */
const selectorHandlers =
{
  'class': [handleClassSelector, ['selector', 'name']]
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