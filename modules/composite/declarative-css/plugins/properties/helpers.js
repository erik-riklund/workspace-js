/**
 * ?
 * 
 * @type {Record<string, RegExp>}
 */
const propertyPatterns = {};

/**
 * ?
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
 * ?
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
 * ?
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