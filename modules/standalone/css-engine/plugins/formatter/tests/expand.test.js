import { it, expect } from 'bun:test'
import { makeEngine } from 'module/css-engine'
import { readableFormatPlugin } from '..'

const engine = makeEngine([readableFormatPlugin]);

it.todo('should expand a block with a single property',
  () =>
  {
    const input = 'h1{color:red}';

    expect(engine(input)).toBe('h1 {\n  color:red;\n}');
  }
);