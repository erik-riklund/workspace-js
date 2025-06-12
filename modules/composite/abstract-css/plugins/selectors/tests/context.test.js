import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '../../..'

const engine = makeAbstractCssEngine();

it('should transform a `with *` selector',
  () =>
  {
    const input = 'div\n{\nwith child class foo\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div:has(>.foo){color:red}');
  }
);

it('should transform a `without *` selector',
  () =>
  {
    const input = 'div\n{\nwithout child class foo\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div:not(:has(>.foo)){color:red}');
  }
);