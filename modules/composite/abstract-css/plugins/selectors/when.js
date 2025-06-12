
const specialCases = {
  focused: 'focus',
  'focused within': 'focus-within',
  hovered: 'hover'
};

/**
 * Handles `when` selectors, e.g. `when hovered` or `when not hovered`.
 * 
 * @param {string} selector
 */
export const handleWhenSelector = (selector) =>
{
  const input = selector.split(/ +/).slice(1);

  const isNegated = input[0] === 'not';
  const event = input.slice(isNegated ? 1 : 0).join(' ');
  const pseudoClass = specialCases[event] || event;
  
  return isNegated ? `&:not(:${pseudoClass})` : `&:${pseudoClass}`;
}