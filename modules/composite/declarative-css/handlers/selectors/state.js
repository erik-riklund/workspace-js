/**
 * Handles `state is **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleStateSelector = ({ state }) =>
{
  return `&.${state.replace(/ /g, '-')}`;
}

/**
 * Handles `state is not **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleNegatedStateSelector = ({ state }) => 
{
  return `&:not(.${state.replace(/ /g, '-')})`;
}