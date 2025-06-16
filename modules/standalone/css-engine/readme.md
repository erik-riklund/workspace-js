# css-engine

This project started as an experiment to build a **declarative styling language** — something more expressive, flexible, and composable than existing CSS preprocessors. Along the way, while building one language, **infrastructure for many** emerged as a result.

The result is a **plugin-based pipeline** for creating custom CSS-like languages. It’s not just a preprocessor — it’s a full `parse → transform → render` pipeline where plugins can hook into each stage:

- **Input plugins** can modify or preprocess raw strings (macros, DSLs, etc.).
- **Transform plugins** operate on a mutable block interface — modify selectors, properties, or process raw custom properties into valid key-value pairs.
- **Output plugins** shape the final rendered string or export formats (JS, JSON, etc.) based on the abstract tree.

The engine is built specifically for the world of CSS, and only a few syntax rules are enforced. The rest is up to plugin authors  — the imagination of the developer is the limit of what can be achieved. 🚀