/**
 * Handles `child *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleChildElementRelationshipSelector =
  ({ name }) => `&>${name}`;

/**
 * Handles `child group **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleChildGroupRelationshipSelector =
  ({ name }) => `&>.${name.replace(/ /g, '-')}`;

/**
 * Handles `sibling *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleSiblingElementRelationshipSelector =
  ({ name }) => `&~${name}`;

/**
 * Handles `sibling group **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleSiblingGroupRelationshipSelector =
  ({ name }) => `&~.${name.replace(/ /g, '-')}`;

/**
 * Handles `adjacent *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAdjacentElementRelationshipSelector =
  ({ name }) => `&+${name}`;

/**
 * Handles `adjacent group **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleAdjacentGroupRelationshipSelector =
  ({ name }) => `&+.${name.replace(/ /g, '-')}`;

/**
 * Handles `descendant *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleDescendantElementRelationshipSelector =
  ({ name }) => `& ${name}`;

/**
 * Handles `descendant group **` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleDescendantGroupRelationshipSelector =
  ({ name }) => `& .${name.replace(/ /g, '-')}`;