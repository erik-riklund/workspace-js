/**
 * Stores compiled regular expressions to avoid recompilation.
 * 
 * @type {Record<string, RegExp>}
 */
const compiledPatterns = {};

/**
 * Parses a CSS selector string based on the given pattern to extract labeled values.
 * 
 * @param {string} pattern
 * @param {string[]} labels
 * @param {string} selector
 * 
 * @returns {MaybeNull<Record<string, string>>}
 */
export const parseSelector = (pattern, labels, selector) =>
{
  if (!(pattern in compiledPatterns))
  {
    compiledPatterns[pattern] = compileSelectorPattern(pattern);
  }

  const expression = compiledPatterns[pattern];
  const matches = expression.exec(selector);

  if (matches)
  {
    return Object.fromEntries(
      labels.map((label, index) => [label, matches[index + 1]])
    );
  }

  return null;
}

/**
 * Compiles a pattern string into a regular expression.
 * 
 * - `*` is replaced with a regular expression that matches a single word.
 * - `**` is replaced with a regular expression that matches a string wrapped in quotes.
 * 
 * @param {string} pattern
 * @returns {RegExp}
 */
const compileSelectorPattern = (pattern) =>
{
  /**
   * Replaces `{groups}` with a regular expression that matches
   * any of the specified groups.
   * 
   * @param {string} _input
   * @param {string} groups
   */
  const handleGroup = (_input, groups) => 
  {
    return `(${groups.replace(/,/g, '|')})`;
  }

  /**
   * Replaces `[groups]` with a regular expression that matches
   * any of the specified groups, or nothing.
   * 
   * @param {string} _input
   * @param {string} groups
   */
  const handleOptionalGroup = (_input, groups) =>
  {
    return `(?:\\s(${groups.replace(/,/g, '|')}))?`;
  }

  const compiledPattern = pattern
    .replace(/\{([^}]+)}/g, handleGroup)
    .replace(/\s\[([^\]]+)]/g, handleOptionalGroup)
    .replace(/\*\*/g, '"([\\w\\s-]+)"')
    .replace(/\s\*\?/g, '(?:\\s`([\\w\\s-]+)`)?')
    .replace(/\*/g, '`([\\w\\s-]+)`');

  return new RegExp(`^${compiledPattern}$`);
};

/**
 * Returns the lower and upper breakpoints for the given device.
 * 
 * @param {string} device
 * @return {{ lower: string, upper: string }}
 */
export const getDeviceSize = (device) =>
{
  const breakpoints = {
    mobile: { lower: null, upper: '575px' },
    tablet: { lower: '576px', upper: '959px' },
    laptop: { lower: '960px', upper: '1439px' },
    desktop: { lower: '1440px', upper: null }
  };

  return breakpoints[device];
}