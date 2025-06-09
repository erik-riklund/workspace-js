/**
 * Creates a function that filters an array of file paths based on
 * the provided pattern, returning only the entries that match.
 * 
 * @param {string} pattern
 * @returns {(filePaths: string[]) => string[]}
 */
export const makePathFilter = (pattern) =>
{
  const compiledPattern = compilePattern(pattern);

  return (filePaths) => filePaths.filter((path) => compiledPattern.test(path));
};

/**
 * Compiles the given glob pattern into a regular expression.
 * 
 * @param {string} pattern
 */
const compilePattern = (pattern) =>
{
  // PURPOSE:
  // Compile the glob pattern (a string) into a regular expression
  // that can be used to match file paths against the pattern.
  // 
  // The regular expression is created as follows:
  //
  // 1. All occurrences of '.' and '/' are escaped with '\'.
  // 2. Replace '**/' with '([^/]+\/)*', which matches any number of subdirectories.
  // 3. Replace '*' without a preceding ')' with '[^/]+', which matches any non-slash character.
  // 4. Replace '{group}' with '(group)', where 'group' is a comma-separated list of values.

  const escapedPattern = pattern.replace(/[./]/g, '\\$&');

  const compiledPattern = escapedPattern
    .replace(/\*{2}\\\//, '([^/]+\/)*')
    .replace(/(?<![)])\*/, '[^/]+')
    .replace(/\{([^}]+)}/g, (_, group) =>
      `(${group.split(',').map((item) => item.trim()).join('|')})`
    );

  return new RegExp(`^${compiledPattern}$`);
};