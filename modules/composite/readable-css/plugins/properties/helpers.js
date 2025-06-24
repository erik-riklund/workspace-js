/**
 * Stores compiled regular expressions for
 * property patterns to avoid recompilation.
 * 
 * @type {Record<string, RegExp>}
 */
const propertyPatterns = {};

/**
 * Handles a property by replacing the matched pattern with a `key:value` format.
 * 
 * @param {string} pattern
 * @param {string} input
 */
export const handleProperty = (pattern, input) =>
{
  const expression = compilePropertyPattern(pattern);

  return input.replace(expression, '$1:$2');
}

/**
 * Handles a custom property by replacing the matched pattern
 * in the input string using the provided handler function.
 * 
 * @param {string} pattern
 * @param {string} input
 * @param {(...groups: string[]) => string} handler
 */
export const handleCustomProperty = (pattern, input, handler = undefined) =>
{
  const expression = compilePropertyPattern(pattern);

  return input.replace(expression, (_match, ...groups) => handler(...groups));
}

/**
 * Compiles a property pattern into a regular expression.
 * 
 * - `**` matches any sequence of characters not containing a semicolon.
 * - `*` matches any sequence of characters not containing whitespace.
 * 
 * @param {string} pattern
 */
const compilePropertyPattern = (pattern) =>
{
  if (pattern in propertyPatterns)
  {
    return propertyPatterns[pattern];
  }

  const compiledPattern =
    (`(?<=[\\{\\s;])${pattern}(?=;)`)
      .replace(/\*\*/g, '([^;]+)')
      .replace(/\*/g, '([^\\s]+)');

  propertyPatterns[pattern] = new RegExp(compiledPattern, 'gs');

  return propertyPatterns[pattern];
}