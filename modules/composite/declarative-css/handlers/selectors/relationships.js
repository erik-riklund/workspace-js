/**
 * The combinators for `child`, `sibling` and `adjacent` selectors.
 */
const combinators = { child: '>', sibling: '+', adjacent: '~' };

/**
 * Handles `child *`, `sibling *` and `adjacent *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleRelationshipSelector = ({ selector, type, name }) =>
{
  const prefix = type === 'class' ? '.' : '';

  if ((!prefix && !type) || (prefix && !name))
  {
    const targetType = type === 'class' ? 'class' : 'element';

    throw new Error(
      `Invalid \`${selector}\` selector (missing ${targetType} name)`
    );
  }

  return `&${combinators[selector] + prefix + (name || type)}`;
}