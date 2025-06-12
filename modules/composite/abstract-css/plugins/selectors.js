import { handleAttributeSelector } from './selectors/attributes'
import { handleDeviceSelector } from './selectors/device'
import { handleIdentifierSelector } from './selectors/identifiers'
import { handleRelationshipSelector } from './selectors/relationships'
import { handleScopeSelector } from './selectors/scope'
import { handleStateSelector } from './selectors/state'
import { handleWhenSelector } from './selectors/when'
import { handleWithSelector } from './selectors/context'
import { handleWithoutSelector } from './selectors/context'

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

  // Context selectors are used to select elements based on their children,
  // e.g. `with child class foo` selects all elements that have a direct child with the class `foo`.

  'with': handleWithSelector,
  'without': handleWithoutSelector,

  // Attributes are used to select elements that have a specific attribute,
  // e.g. `attribute data-foo` selects all elements that have a `data-foo` attribute.

  'attribute': handleAttributeSelector,

  // Device selectors are used to specify styles that should only be applied
  // to specific devices, e.g. `on device tablet` scopes the properties and
  // selectors within it to only apply to tablets.

  'device': handleDeviceSelector,

  // Scope selectors are used to scope styles to a specific component. This is done
  // by using a data-attribute on the component element, e.g. `scope foo` scopes the
  // properties to elements with the `data-foo` attribute.

  'scope': handleScopeSelector,

  // State selectors are used to select elements that are in a specific state,
  // e.g. `state expanded` selects elements that have the `expanded` class.

  'state': handleStateSelector,

  // The `when` selector is used to select elements based on pseudo-classes,
  // e.g. `when hovered` selects elements that are hovered over.

  'when': handleWhenSelector
}

/** @type {CssEngine.Plugin} */
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