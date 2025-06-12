import { it, expect } from 'bun:test'
import { handleSelectors } from '../handlers/selector'

// ----- handleClassSelector ---------------

it('should transform a `class *` selector',
  () =>
  {
    const input = 'class foo';

    expect(handleSelectors([input])).toEqual(['.foo']);
  }
);