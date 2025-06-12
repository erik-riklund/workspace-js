import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '../../..'

const engine = makeAbstractCssEngine();

it('should transform a `scope *` selector',
  () =>
  {
    const input = 'scope foo\n{\ncolor:red\n}';

    expect(engine(input)).toBe('[data-foo]{color:red}');
  }
);