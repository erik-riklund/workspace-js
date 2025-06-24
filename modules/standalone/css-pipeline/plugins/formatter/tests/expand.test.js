import { it, expect } from 'bun:test'
import { makePipeline } from 'module/css-pipeline'
import { readableFormatPlugin } from '..'

const engine = makePipeline([readableFormatPlugin]);