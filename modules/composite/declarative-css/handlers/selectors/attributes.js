/**
 * Handles `attribute *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeSelector = ({ name }) => `&[${name}]`;

/**
 * Handles `attribute * is missing` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeIsMissingSelector = ({ name }) => `&:not([${name}])`;

/**
 * Handles `attribute * is **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeIsValueSelector = ({ name, value }) =>
{
  return `&[${name}=${value.includes(' ') ? `"${value}"` : value}]`;
}

/**
 * Handles `attribute * is not **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAttributeIsNotValueSelector = ({ name, value }) =>
{
  return `&:not([${name}=${value.includes(' ') ? `"${value}"` : value}])`;
}