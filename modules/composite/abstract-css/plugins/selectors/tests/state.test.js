import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '../../..'

const engine = makeAbstractCssEngine();

it('should transform a `state *` selector',
  () =>
  {
    const input = 'state foo\n{\ncolor:red\n}';

    expect(engine(input)).toBe('.foo{color:red}');
  }
);

it('should transform a `state not *` selector',
  () =>
  {
    const input = 'state not foo\n{\ncolor:red\n}';

    expect(engine(input)).toBe(':not(.foo){color:red}');
  }
);