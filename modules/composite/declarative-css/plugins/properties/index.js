import { handleProperty } from './helpers'
import { handleCustomProperty } from './helpers'

/**
 * ?
 * 
 * @type {CssEngine.InputPlugin}
 */
export const propertiesPlugin =
{
  stage: 'input',

  handler: (input) => 
  {
    /**
     * ?
     */
    input = handleProperty('set * to **', input);

    /**
     * ?
     */
    input = handleCustomProperty(
      'include **', input, (groups) => `!include: ${groups}`
    );

    return input;
  }
}