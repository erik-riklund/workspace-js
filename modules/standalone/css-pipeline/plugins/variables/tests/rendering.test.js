import { makeEngine } from 'module/css-pipeline'
import { createVariablesPlugin } from '..'
import { it, expect, beforeEach } from 'bun:test'

let engine; beforeEach(
  () => engine = makeEngine([createVariablesPlugin()])
);

it.todo('should ?',
  () =>
  {
    // ...
  }
);