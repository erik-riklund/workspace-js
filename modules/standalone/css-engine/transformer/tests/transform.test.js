import { it, expect } from 'bun:test'
import { createTreeFromString } from '../../parser'
import { transformTree } from '..'

it('should add a new property',
  () =>
  {
    const input = 'h1{color=red\n}';
    const tree = createTreeFromString(input);

    /** @type {CssEngineTransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('background-color', 'blue')
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'red', line: 1 },
          { key: 'background-color', value: 'blue', line: 0 }
        ],
        metadata: {
          startsAt: { line: 1, column: 3 },
          endsAt: { line: 2, column: 1 }
        }
      }
    ]);
  }
);

it('should change the value of an existing property',
  () =>
  {
    const input = 'h1{color=red\n}';
    const tree = createTreeFromString(input);

    /** @type {CssEngineTransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('color', 'blue')
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'blue', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 3 },
          endsAt: { line: 2, column: 1 }
        }
      }
    ]);
  }
);

it('should replace a property with two new properties',
  () =>
  {
    const input = 'h1{color=red\n}';
    const tree = createTreeFromString(input);

    /** @type {CssEngineTransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) => block.replaceProperty('color',
        (value) => ([
          { key: 'border-color', value: 'black' },
          { key: 'background-color', value: 'pink' }
        ])
      )
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'border-color', value: 'black', line: 0 },
          { key: 'background-color', value: 'pink', line: 0 }
        ],
        metadata: {
          startsAt: { line: 1, column: 3 },
          endsAt: { line: 2, column: 1 }
        }
      }
    ]);
  }
);