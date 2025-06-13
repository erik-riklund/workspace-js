/**
 * Handles `class *` and `unique *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleIdentifierSelector = ({ selector, name }) =>
{
  if (!name)
  {
    throw new Error(`Invalid \`${selector}\` selector (missing name)`);
  }

  return `&${(selector === 'class' ? '.' : '#') + name}`;
}