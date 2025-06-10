/** @param {string} selector */
export const handleAttributeSelector = (selector) =>
{
  const [attribute, ...input] = selector.split(' ').slice(1);
  const value = input.slice(input[1] === 'not' ? 2 : 1).join(' ');

  if (value.trim() === 'missing')
  {
    return `&:not([${attribute}])`;
  }
  else
  {
    const isNegated = input[1] === 'not';
    const operator = value.startsWith('"') ? '=' : '';

    return isNegated
      ? `&:not([${attribute + operator + value}])`
      : `&[${attribute + operator + value}]`;
  }
}