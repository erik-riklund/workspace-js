import { getDeviceSize } from './helpers'

/**
 * Handles `attribute *` and `attribute * is missing` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeSelector = ({ name, keyword }) =>
{
  const attribute = name.replace(/\s/g, '-');

  return (keyword === 'is missing') ? `&:not([${attribute}])` : `&[${attribute}]`;
}

/**
 * Handles `attribute * is **` and `attribute * is not **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeValueSelector = ({ name, keyword, value }) =>
{
  const attribute = name.replace(/\s/g, '-');
  value = value.includes(' ') ? `"${value}"` : value;

  return (keyword === 'is') ? `&[${attribute}=${value}]` : `&:not([${attribute}=${value}])`;
}

/**
 * Handles the `base` selector.
 */
export const handleBaseSelector = () => ':root';

/**
 * Handles `with *` and `without *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleContextSelector = ({ selector, relationship, type, name }) =>
{
  const combinators = {
    child: '>', sibling: '~', adjacent: '+', descendant: ''
  };

  const prefix = (type === 'group') ? '.' : '';
  const identifier = name.replace(/\s/g, '-');
  const predicate = combinators[relationship] + prefix + identifier;

  return (selector === 'with') ? `&:has(${predicate})` : `&:not(:has(${predicate}))`;
}

/**
 * Handles `device *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleDeviceSelector = ({ device }) =>
{
  let mediaQuery = `@media screen `;
  const { lower, upper } = getDeviceSize(device);

  if (lower)
  {
    mediaQuery += `and(min-width:${lower})`;
  }

  if (upper)
  {
    mediaQuery += `and(max-width:${upper})`;
  }

  return mediaQuery;
}

/**
 * Handles `device * .. *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleDeviceRangeSelector = ({ fromDevice, toDevice }) =>
{
  let mediaQuery = `@media screen `;

  if (fromDevice)
  {
    const { lower } = getDeviceSize(fromDevice);

    mediaQuery += `and(min-width:${lower})`;
  }

  if (toDevice)
  {
    const { upper } = getDeviceSize(toDevice);

    mediaQuery += `and(max-width:${upper})`;
  }

  if (mediaQuery === '@media screen ')
  {
    throw new Error(
      `Invalid device range: No devices specified.`
    );
  }

  return mediaQuery;
}

/**
 * Handles `group *` and `unique *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleIdentifierSelector = ({ selector, name }) =>
{
  const prefix = selector === 'group' ? '&.' : '&#';
  const identifier = name.replace(/\s/g, '-');

  return prefix + identifier;
}

/**
 * Handles `child *`, `sibling *`, `adjacent *`, and `descendant *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleRelationshipSelector = ({ selector, type, name }) =>
{
  const combinators = {
    child: '>', sibling: '~', adjacent: '+', descendant: ' '
  };

  const prefix = (type === 'group') ? '.' : '';
  const identifier = name.replace(/\s/g, '-');

  return '&' + combinators[selector] + prefix + identifier;
}

/**
 * Handles `state is *` and `state is not *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleStateSelector = ({ keyword, state }) =>
{
  const name = state.replace(/\s/, '-');

  return (keyword === 'is') ? `&.${name}` : `&:not(.${name})`;
}

/**
 * Handles `scope *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleScopeSelector = ({ name }) =>
{
  const scope = name.includes(' ') ? `"${name}"` : name;

  return `&[data-scope=${scope}]`;
}

/**
 * Handles `when *` and `when not *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleWhenSelector = ({ keyword, state }) =>
{
  const specialCases = {
    focused: 'focus', 'focused within': 'focus-within', hovered: 'hover'
  }

  const pseudoClass = specialCases[state] || state;

  return keyword === 'not' ? `&:not(:${pseudoClass})` : `&:${pseudoClass}`;
}