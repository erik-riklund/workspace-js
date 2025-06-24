## Tilesheets - *a plugin-driven CSS rendering pipeline*

> ⚠️ **Tilesheets** is currently in an experimental state and is not ready for production use.

![Plugin-driven CSS rendering pipeline](/images/css-pipeline.png)

---

### 🧩

**Tilesheets** is a _plugin-based CSS rendering pipeline_ that lets you build and customize stylesheet transformations with precision. Instead of locking you into a rigid build process, it gives you a **flexible system** where each step — from parsing to output — is handled by plugins you can mix, match, or write yourself. The pipeline helps you **break things down and build them back up** to fit your specific needs.

---

### ⚖️

The system is built to offer a **balance between structure and flexibility in CSS processing**. It provides a clear, pluggable pipeline where the main stages — _input, transformation, and output_ — is highly configurable. The design encourages modular thinking without enforcing a specific style or workflow. You can think of it as a **blend of structured stylesheet authoring with plugin-driven extensibility**, built as a unified system from the ground up.

It’s **designed for situations where CSS needs to do more than just sit in static files** — cases where you’re generating styles dynamically, applying transformations, or managing multiple output targets. Tilesheets gives you the tools to compose that process cleanly, without locking you into a fixed set of assumptions.

---

### 🧬

The pipeline extends standard CSS with **enhanced nesting support**. It uses `&` as a placeholder for the current selector, much like native CSS nesting. During rendering, it's replaced with the parent selector. If the `&` is omitted, a space is added between the parent and child selectors, creating a descendant selector, e.g. `form input {...}`.

> ℹ️ Nesting is optional. Use the examples below to decide which style you prefer.

```css
.card
{
  display: block;

  &-header
  {
    font-weight: bold;

    &:hover { color: red; }
  }
}
```
```css
.card
{
  display: block;
}

.card-header
{
  font-weight: bold;
}

.card-header:hover
{
  color: red;
}
```

Nesting is _purely syntactic_ — there’s **no runtime overhead or compatibility issues**. Nested selectors are transformed into flat selectors during the rendering process. This ensures that the **resulting CSS output works in all browsers**, regardless of native nesting support.

---

### 🧾

The pipeline gains flexibility through the use of **custom properties**, denoted by a leading `!`. These aren't to be confused with standard CSS custom properties, e.g. `--var`. Instead, they are arbitrary key-value pairs that **plugins specifically process and transform**.

```css
div
{
  !some-key: A value that can be transformed by a plugin,
    possibly stretching over multiple lines;
}
```

> ⚠️ Unhandled custom properties are reported as warnings and removed from the output.

---