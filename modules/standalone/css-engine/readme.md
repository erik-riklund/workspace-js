# CSS-o-matic 3000 (alpha)

![CSS-o-matic 3000](../../../images/css-engine.png)

> ⚠️ The engine is currently in an experimental state and is not ready for production use.

**CSS-o-matic 3000** is a lightweight, modular CSS engine built to effortlessly parse, transform, and render CSS. Its flexible, extensible architecture empowers you to create custom plugins that hook into the engine's core processing stages: *input*, *transform*, and *output*.

By adding plugins to the pipeline, you can intercept and modify the raw input, manipulate the abstract syntax tree (AST), or adjust the final output as needed. The engine comes with a suite of ready-to-use plugins, but you're free to craft your own to implement custom logic. Your creativity sets the boundaries. 🚀

> ℹ️ At this stage, I encourage you to check out [`Poise.css`](/modules/composite/declarative-css/readme.md) for examples on how to use and extend the engine. It's a custom language engine designed to provide a natural language-like approach to CSS.