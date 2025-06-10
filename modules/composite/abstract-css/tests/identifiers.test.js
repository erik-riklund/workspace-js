import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '..'

const engine = makeAbstractCssEngine();

it('should transform a `class *` selector',
  () =>
  {
    const input = 'class foo{color=red\n}';

    expect(engine(input)).toBe('.foo{color:red}');
  }
);

it('should transform a `unique *` selector',
  () =>
  {
    const input = 'unique foo{color=red\n}';

    expect(engine(input)).toBe('#foo{color:red}');
  }
);

it('should transform a `class *` selector nested inside another block',
  () =>
  {
    const input = 'div{class foo{color=red\n}}';

    expect(engine(input)).toBe('div.foo{color:red}');
  }
);

it('should transform a `unique *` selector nested inside another block',
  () =>
  {
    const input = 'div{unique foo{color=red\n}}';

    expect(engine(input)).toBe('div#foo{color:red}');
  }
);