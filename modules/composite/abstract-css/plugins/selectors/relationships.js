
const operators = {
  child: '>', sibling: '~', adjacent: '+', descendant: ' '
};

/**
 * Handles relationship selectors, e.g. `child div` or `child class foo`.
 * 
 * @param {string} selector
 */
export const handleRelationshipSelector = (selector) =>
{
  const [relation, ...input] = selector.split(' ');
  const operator = operators[relation];

  const prefix = input[0] === 'class' ? '.' : '';
  const element = input[prefix ? 1 : 0];

  return `&${operator + prefix + element}`;
}