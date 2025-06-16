/**
 * Stores compiled regular expressions to avoid recompilation.
 * 
 * @type {Record<string, RegExp>}
 */
const compiledPatterns = {};

/**
 * Parses a CSS selector string based on a given pattern and extracts labeled values.
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
    compiledPatterns[pattern] = compilePattern(pattern);
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
const compilePattern = (pattern) =>
{
  const compiledPattern = pattern
    .replace(/\*\*/g, '[\'"]([\\w\\s-]+)[\'"]')
    .replace(/\*/g, '[\'"]?([\\w-]+)[\'"]?');

  return new RegExp(`^${compiledPattern}$`);
};