import { handleAttributeSelector } from './selectors/attributes'
import { handleIdentifierSelector } from './selectors/identifiers'
import { handleRelationshipSelector } from './selectors/relationships'

const selectorHandlers =
{
  // Identifiers are used to select elements by their class or unique name,
  // e.g. `class foo` selects all elements with the class `foo`.

  'class': handleIdentifierSelector,
  'unique': handleIdentifierSelector,

  // Relationship selectors are used to select elements that have a specific
  // relation to another element, e.g. `child p` selects all `<p>` elements
  // that are direct children of its parent (the block it’s nested in).

  'child': handleRelationshipSelector,
  'sibling': handleRelationshipSelector,
  'adjacent': handleRelationshipSelector,
  'descendant': handleRelationshipSelector,

  // Attributes are used to select elements that have a specific attribute,
  // e.g. `attribute data-foo` selects all elements that have a `data-foo` attribute.

  'attribute': handleAttributeSelector
}

/** @type {CssEnginePlugin} */
export const abstractSelectorsPlugin =
{
  stage: 'transform',

  handler: (block) =>
  {
    const selectors = block.getSelectors();

    for (let i = 0; i < selectors.length; i++)
    {
      const selector = selectors[i];

      for (const [prefix, handler] of Object.entries(selectorHandlers))
      {
        if (selector.startsWith(`${prefix} `))
        {
          selectors[i] = handler(selector);

          break;
        }
      }
    }

    block.setSelectors(selectors);
  }
}