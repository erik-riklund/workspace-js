/**
 * Handles identifier selectors, e.g. `class foo`.
 * 
 * @param {string} selector 
 */
export const handleIdentifierSelector = (selector) =>
{
  const [type, name] = selector.split(' ');
  const prefix = type === 'class' ? '.' : '#';

  return `&${prefix + name}`;
}