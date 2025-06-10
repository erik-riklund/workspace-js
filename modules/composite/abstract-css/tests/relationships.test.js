import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '..'

const engine = makeAbstractCssEngine();

it('should transform a `child *` selector',
  () =>
  {
    const input = 'div{child p{color=red\n}}';

    expect(engine(input)).toBe('div>p{color:red}');
  }
);

it('should transform a `child class *` selector',
  () =>
  {
    const input = 'div{child class test{color=red\n}}';

    expect(engine(input)).toBe('div>.test{color:red}');
  }
);

it('should transform a `sibling *` selector',
  () =>
  {
    const input = 'div{sibling p{color=red\n}}';

    expect(engine(input)).toBe('div~p{color:red}');
  }
);

it('should transform a `sibling class *` selector',
  () =>
  {
    const input = 'div{sibling class test{color=red\n}}';

    expect(engine(input)).toBe('div~.test{color:red}');
  }
);

it('should transform a `adjacent *` selector',
  () =>
  {
    const input = 'div{adjacent p{color=red\n}}';

    expect(engine(input)).toBe('div+p{color:red}');
  }
);

it('should transform a `adjacent class *` selector',
  () =>
  {
    const input = 'div{adjacent class test{color=red\n}}';

    expect(engine(input)).toBe('div+.test{color:red}');
  }
);

it('should transform a `descendant *` selector',
  () =>
  {
    const input = 'div{descendant p{color=red\n}}';

    expect(engine(input)).toBe('div p{color:red}');
  }
);

it('should transform a `descendant class *` selector',
  () =>
  {
    const input = 'div{descendant class test{color=red\n}}';

    expect(engine(input)).toBe('div .test{color:red}');
  }
);