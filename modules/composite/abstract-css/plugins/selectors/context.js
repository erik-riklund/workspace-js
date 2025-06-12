
const operators = {
  child: '>', sibling: '~', adjacent: '+', descendant: ' '
};

/**
 * Handles context selectors, e.g. `with child class foo`.
 * 
 * @param {string} selector
 */
export const handleWithSelector = (selector) =>
{
  const [relation, ...input] = selector.split(/ +/).slice(1);
  const operator = operators[relation];

  const prefix = input[0] === 'class' ? '.' : '';
  const element = input[prefix ? 1 : 0];

  return `&:has(${operator + prefix + element})`;
}

/**
 * Handles negated context selectors, e.g. `without child class foo`.
 * 
 * @param {string} selector
 */
export const handleWithoutSelector = (selector) =>
{
  const [relation, ...input] = selector.split(/ +/).slice(1);
  const operator = operators[relation];

  const prefix = input[0] === 'class' ? '.' : '';
  const element = input[prefix ? 1 : 0];

  return `&:not(:has(${operator + prefix + element}))`;
}