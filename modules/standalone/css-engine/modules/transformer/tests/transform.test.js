import { it, expect } from 'bun:test'
import { transformTree } from '..'

it('should add a new property',
  () =>
  {
    const tree = [
      {
        selectors: ['h1'],
        properties: [{ key: 'color', value: 'red' }],
        metadata: { line: 1 }
      }
    ];

    /** @type {CssEngine.TransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('background-color', 'blue')
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'red' },
          { key: 'background-color', value: 'blue' }
        ],
        metadata: { line: 1 }
      }
    ]);
  }
);

it('should change the value of an existing property',
  () =>
  {
    const tree = [
      {
        selectors: ['h1'],
        properties: [{ key: 'color', value: 'red' }],
        metadata: { line: 1 }
      }
    ];

    /** @type {CssEngine.TransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('color', 'blue')
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'blue' }
        ],
        metadata: { line: 1 }
      }
    ]);
  }
);

it('should transform a raw property into a property',
  () =>
  {
    const tree = [
      {
        selectors: ['h1'],
        rawProperties: ['color:red'],
        metadata: { line: 1 }
      }
    ];

    /** @type {CssEngine.TransformPlugin} */
    const plugin = {
      stage: 'transform',
      handler: (block) =>
      {
        block.handleRawProperties(
          (content) =>
          {
            const [key, value] = content.split(':');

            block.setProperty(key, value);
          }
        );
      }
    };

    transformTree(tree, [plugin]);

    expect(tree).toEqual([
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'red' }
        ],
        rawProperties: ['color:red'],
        metadata: { line: 1 }
      }
    ]);
  }
);