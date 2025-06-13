import { it, expect } from 'bun:test'
import { handleSelectors } from '../handlers/selector'

// ----- handleClassSelector ---------------

it('should throw an error when missing a class name',
  () =>
  {
    const input = 'class ';

    expect(() => handleSelectors([input]))
      .toThrowError('Invalid `class` selector (missing name)');
  }
);

it('should transform a `class *` selector',
  () =>
  {
    const input = 'class foo';

    expect(handleSelectors([input])).toEqual(['&.foo']);
  }
);

// ----- handleRelationshipSelector ---------------

it('should throw an error when missing the name of the target element',
  () =>
  {
    const input = 'child ';

    expect(() => handleSelectors([input]))
      .toThrowError('Invalid `child` selector (missing element name)');
  }
);

it('should throw an error when missing the name of the target class',
  () =>
  {
    const input = 'child class';

    expect(() => handleSelectors([input]))
      .toThrowError('Invalid `child` selector (missing class name)');
  }
);

it('should transform a `child *` selector',
  () =>
  {
    const input = 'child foo';

    expect(handleSelectors([input])).toEqual(['&>foo']);
  }
);

it('should transform a `child class *` selector',
  () =>
  {
    const input = 'child class foo';

    expect(handleSelectors([input])).toEqual(['&>.foo']);
  }
);

// ----- handleUniqueSelector ---------------

it('should throw an error when missing a unique name',
  () =>
  {
    const input = 'unique ';

    expect(() => handleSelectors([input]))
      .toThrowError('Invalid `unique` selector (missing name)');
  }
);

it('should transform a `unique *` selector',
  () =>
  {
    const input = 'unique foo';

    expect(handleSelectors([input])).toEqual(['&#foo']);
  }
);