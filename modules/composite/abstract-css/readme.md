# abstract-css

> ⚠️ This module is a plugin for [`css-engine`](/modules/standalone/css-engine/readme.md).

What if writing CSS could be as **straightforward as speaking**? This module aims to make that possible, providing a **plain-language abstraction** that rethinks how stylesheets are structured.

<div style="text-align: center; margin-block: 1.5rem">
  <img src="../../../images/abstract-css.png" width="512" style="max-width: 100%" />
</div>

This plugin simplifies stylesheet creation by removing much of the complexity and repetition found in traditional CSS. By using plain language, the resulting stylesheets are **clear, readable, and easy to maintain**, making the styling process more efficient and approachable.

> ℹ️ The abstractions provided by this module are translated into standard CSS behind the scenes. These plain-language selectors can be combined with traditional CSS selectors when necessary, allowing for flexible and precise styling while still benefiting from improved readability and reduced complexity.

---

## Table of contents

_The documentation assumes that you already know the basics of HTML and CSS._

- [Using identifiers like classes and unique names to select elements](#using-identifiers-like-classes-and-unique-names-to-select-elements)
- [Selecting elements based on their relationship to other elements](#selecting-elements-based-on-their-relationship-to-other-elements)
- [Selecting elements based on their attributes](#selecting-elements-based-on-their-attributes)
- [Standardized device ranges instead of media queries](#standardized-device-ranges-instead-of-media-queries)

---

### Using identifiers like classes and unique names to select elements

To apply styles to a webpage, it's important to specify exactly which parts should be affected. This is typically done using **identifiers like classes and unique names**.

A **class** can be assigned to multiple elements that should share the same styling. For example, several important paragraphs might use the same class to maintain a consistent appearance. In contrast, when styling a single, specific element, a **unique name** can be used. This ensures that only that element is affected by the style.

```scss
class foo
{
  // translates to `.foo`
}

unique foo
{
  // translates to `#foo`
}
```

#### ℹ️ Using nesting to scope the identifier to a specific element

```scss	
div
{
  class foo
  {
    // translates to `div.foo`
  }

  unique bar
  {
    // translates to `div#bar`
  }

  child p
  {
    // translates to `div > p`

    class highlight
    {
      // translates to `div > p.highlight`
    }
  }
}
```

---

### Selecting elements based on their relationship to other elements

Sometimes, styles are applied not through direct labels, but **based on an element’s position relative to others** within the page. This approach relies on the natural structure of the HTML.

For instance, consider a main content area where only the images inside that section should be styled, rather than every image on the page. This is where **relationship-based selectors** become useful. It's possible to instruct the browser to target “any image that’s directly within this specific container.” This method offers a flexible and powerful way to style elements based on how they’re nested or positioned in relation to one another.

```scss
*
{
  child span
  {
    // translates to `* > span`
  }

  child class foo
  {
    // translates to `* > .foo`
  }
}
```

```scss
*
{
  sibling span
  {
    // translates to `* ~ span`
  }

  sibling class foo
  {
    // translates to `* ~ .foo`
  }
}
```

```scss
*
{
  adjacent span
  {
    // translates to `* + span`
  }

  adjacent class foo
  {
    // translates to `* + .foo`
  }
}
```

```scss
*
{
  descendant span
  {
    // translates to `* span`
  }

  descendant class foo
  {
    // translates to `* .foo`
  }
}
```

#### ℹ️ Using nesting to create more complex selectors

```scss
form
{
  child label
  {
    // translates to `form > label`

    adjacent input
    {
      // translates to `form > label + input`
    }
  }

  descendant button
  {
    // translates to `form button`

    child span
    {
      // translates to `form button > span`
    }
  }
}
```

---

### Selecting elements based on their attributes

HTML elements often include additional information in the form of attributes. Using these attributes to select elements provides a simple way to apply different styles to the same type of element, depending on the presence or value of those attributes.

```scss
*
{
  attribute foo
  {
    // translates to `*[foo]`
  }

  attribute foo is missing
  {
    // translates to `*:not([foo])`
  }

  attribute foo is "bar"
  {
    // translates to `*[foo="bar"]`
  }

  attribute foo is not "bar"
  {
    // translates to `*:not([foo="bar"])`
  }
}
```

---

### Standardized device ranges instead of media queries

Responsive styles can be defined using **named device ranges**, offering a more readable alternative to traditional media queries. Instead of writing verbose `@media` rules, styles are scoped with straightforward terms like `tablet` or `laptop`, each corresponding to commonly used screen widths.

```scss
device tablet
{
  // translates to `@media screen and (min-width: 576px) and (max-width: 1023px)`
}

device .. laptop
{
  // translates to `@media screen and (max-width: 1439px)`
}

device tablet ..
{
  // translates to `@media screen and (min-width: 576px)`
}

device tablet .. laptop
{
  // translates to `@media screen and (min-width: 576px) and (max-width: 1439px)`
}
```

#### ℹ️ ?

...

```scss
div
{
  color red
  border 1px solid black

  device desktop
  {
    color blue
    background-color pink
  }
}
```

This translates to:

```css
div
{
  color: red;
  border: 1px solid black;
}

@media screen and (min-width: 1440px)
{
  div
  {
    color: blue;
    background-color: pink;
  }
}
```

---