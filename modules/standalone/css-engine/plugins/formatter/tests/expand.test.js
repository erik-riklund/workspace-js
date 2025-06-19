import { it, expect } from 'bun:test'
import { makeEngine } from 'module/css-engine'
import { readableFormatPlugin } from '..'

const engine = makeEngine([readableFormatPlugin]);