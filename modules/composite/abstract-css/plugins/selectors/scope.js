/**
 * Handles scope selectors, e.g. `scope foo`.
 * 
 * @param {string} selector 
 */
export const handleScopeSelector = (selector) =>
{
  const [name] = selector.split(/ +/).slice(1);
  
  return `&[data-${name}]`;
}