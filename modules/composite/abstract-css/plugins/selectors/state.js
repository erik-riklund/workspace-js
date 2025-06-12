/**
 * Handles state selectors, which target elements based on their class.
 * E.g. `state expanded` selects elements that have the `expanded` class.
 * 
 * @param {string} selector 
 */
export const handleStateSelector = (selector) =>
{
  const [...state] = selector.split(/ +/).slice(1);

  return state[0] === 'not' ? `:not(.${ state[1] })` : `.${ state[0] }`;
}