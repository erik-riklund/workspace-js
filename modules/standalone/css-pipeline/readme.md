## Tilesheets – *a plugin-driven CSS rendering pipeline*

> ⚠️ Experimental state, **not production-ready**.

![Plugin-driven CSS rendering pipeline](/images/css-pipeline.png)

_Tilesheets is a pleasure to work with — expressive, flexible, and refreshingly straightforward._

---

### 🧩

**Tilesheets** is a **plugin-based CSS rendering pipeline** that gives you full control over how stylesheets are processed. Rather than prescribing a fixed build system, the system offers a modular approach where each stage of the pipeline — _input_, _transformation_, and _output_ — is customizable through plugins. Whether you want to extend how styles are written, optimize output, or integrate with custom workflows, Tilesheets is designed to **adapt to your needs, not the other way around**.

---

### ⚖️

Tilesheets is built to provide a **balanced approach** to CSS processing — structured enough to provide a solid foundation, and flexible enough to give you full control. You can add and remove plugins as needed for your workflow, allowing you to **tailor the pipeline to your specific needs** — the core pipeline only **provides a solid starting point**, no plugins are enabled by default.

---

### 🧬

Tilesheets supports **enhanced CSS nesting** using the familiar `&` symbol, which acts as a reference to the current selector (similar to native CSS nesting). If you omit the `&`, the system adds a space between parent and child selectors (i.e., a descendant selector):

```
.card
{
  &-header
  {
    //-> `.card-header`

    &:hover
    {
      //-> `.card-header:hover`
    }
  }
}
```

Nesting is **syntactic only** — meaning it’s transformed into flat selectors when rendered. This ensures that there's **no runtime overhead**, and that your output CSS works consistently — regardless of native nesting support in browsers.

---

### 🧾

Tilesheets introduces **custom plugin-handled properties**, prefixed with `!`. They provide plugins with a way to easily integrate new behaviors into stylesheets. As an example, the `!include` property is used by the bundled `reusables` plugin to expand reusable property blocks.

Example:

```
div
{
  !some-key: A value that can be transformed by a plugin,
             possibly stretching over multiple lines;
}
```

> ⚠️ Unprocessed properties trigger a warning before being removed from the output.

---