## Tilesheets - *a plugin-driven CSS rendering pipeline*

![Plugin-driven CSS rendering pipeline](../../../images/css-pipeline.png)

> ⚠️ **Tilesheets** is currently in an experimental state and is not ready for production use.

_Tilesheets treats your stylesheet pipeline as a series of discrete steps. Each step is a plugin — pure, testable, and composable. No assumptions about what “CSS” means in your context._

---

**Tilesheets** is a _plugin-based CSS rendering pipeline_ that lets you build and customize stylesheet transformations with precision. Instead of locking you into a rigid build process, it gives you a **flexible system** where each step — from parsing to output — is handled by plugins you can mix, match, or write yourself. Whatever your goal — be it optimizing output, experimenting with new CSS workflows, or anything in between — the pipeline helps you **break things down and build them back up** to fit your specific needs.

### Why it exists?

Tilesheets is built to offer a **balance between structure and flexibility in CSS processing**. It provides a clear, pluggable pipeline where each stage — from parsing to transformation to output — is fully configurable. The design encourages modular thinking without enforcing a specific style or workflow. You can think of it as a **blend of structured stylesheet authoring with plugin-driven extensibility**, built as a unified system from the ground up.

It’s **designed for situations where CSS needs to do more than just sit in static files** — cases where you’re generating styles dynamically, applying transformations, or managing multiple output targets. Tilesheets gives you the tools to compose that process cleanly, without locking you into a fixed set of assumptions.