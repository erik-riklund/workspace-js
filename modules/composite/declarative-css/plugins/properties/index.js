import { handleProperty } from './helpers'
import { handleCustomProperty } from './helpers'

/**
 * An input plugin that processes custom property syntaxes.
 * 
 * @type {CssEngine.InputPlugin}
 */
export const propertiesPlugin =
{
  stage: 'input',

  handler: (input) => 
  {
    /**
     * Transforms `set [property] to [value];` into `[property]:[value];`.
     * For example, `set font-size to 16px;` becomes `font-size:16px;`.
     */
    input = handleProperty('set * to **', input);

    /**
     * Transforms `include [block1], [block2], ...;` into `!include: [block], [block2], ...;`.
     */
    input = handleCustomProperty(
      'include **', input, (groups) => `!include: ${groups}`
    );

    return input;
  }
}