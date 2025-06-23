import { it, expect } from 'bun:test'

import { createTreeFromString } from '../../parser';
import { transformTree } from '..'

it('should add a new property',
  () =>
  {
    const tree = createTreeFromString('h1{color:red;}');

    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('background-color', 'blue')
    };

    // @ts-expect-error
    transformTree(tree, [plugin]);

    expect(tree[0].properties).toEqual([
      { key: 'color', value: 'red' },
      { key: 'background-color', value: 'blue' }
    ]);
  }
);

it('should change the value of an existing property',
  () =>
  {
    const tree = createTreeFromString('h1{color:red;}');

    const plugin = {
      stage: 'transform',
      handler: (block) => block.setProperty('color', 'blue')
    };

    // @ts-expect-error
    transformTree(tree, [plugin]);

    expect(tree[0].properties).toEqual([{ key: 'color', value: 'blue' }]);
  }
);

it('should remove a property',
  () =>
  {
    const tree = createTreeFromString('h1{color:red;background-color:blue;}');

    const plugin = {
      stage: 'transform',
      handler: (block) => block.removeProperty('background-color')
    };

    // @ts-expect-error
    transformTree(tree, [plugin]);

    expect(tree[0].properties).toEqual([{ key: 'color', value: 'red' }]);
  }
);