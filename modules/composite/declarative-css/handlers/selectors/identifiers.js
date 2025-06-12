/**
 * ?
 * 
 * @param {Record<string, string>} input
 */
export const handleClassSelector = ({ name }) =>
{
  if (!name)
  {
    //

    throw new Error('Invalid class selector (missing name)');
  }

  return `.${name}`;
}