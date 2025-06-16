/**
 * Handles `group *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleGroupIdentifierSelector = ({ name }) => `&.${name}`;

/**
 * Handles `unique *` selectors.
 * 
 * @param {Record<string, string>} input
 */
export const handleUniqueIdentifierSelector = ({ name }) => `&#${name}`;