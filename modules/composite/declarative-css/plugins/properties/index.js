/**
 * ?
 * 
 * @type {CssEngine.InputPlugin}
 */
export const propertiesPlugin =
{
  stage: 'input',

  handler: (input) => input.replace(/(?<=\s|\{)set\s+(\w+(?:-\w+)*)\s+to\s+([^\n;]+)/gs, '$1:$2;')
}