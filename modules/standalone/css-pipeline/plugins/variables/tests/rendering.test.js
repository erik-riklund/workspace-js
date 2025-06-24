import { makePipeline } from 'module/css-pipeline'
import { createVariablesPlugin } from '..'
import { it, expect, beforeEach } from 'bun:test'

let engine; beforeEach(
  () => engine = makePipeline([createVariablesPlugin()])
);

it.todo('should ?',
  () =>
  {
    // ...
  }
);