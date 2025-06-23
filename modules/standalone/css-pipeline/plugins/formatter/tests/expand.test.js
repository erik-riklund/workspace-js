import { it, expect } from 'bun:test'
import { makeEngine } from 'module/css-pipeline'
import { readableFormatPlugin } from '..'

const engine = makeEngine([readableFormatPlugin]);