import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '..'

const engine = makeAbstractCssEngine();

it('should transform an `attribute *` selector',
  () =>
  {
    const input = 'attribute data-foo{color=red\n}';

    expect(engine(input)).toBe('[data-foo]{color:red}');
  }
);

it('should transform an `attribute * is missing` selector',
  () =>
  {
    const input = 'attribute data-foo is missing{color=red\n}';

    expect(engine(input)).toBe(':not([data-foo]){color:red}');
  }
);

it('should transform an `attribute * is "?"` selector',
  () =>
  {
    const input = 'attribute data-foo is "bar"{color=red\n}';

    expect(engine(input)).toBe('[data-foo="bar"]{color:red}');
  }
);

it('should transform an `attribute * is not "?"` selector',
  () =>
  {
    const input = 'attribute data-foo is not "bar"{color=red\n}';

    expect(engine(input)).toBe(':not([data-foo="bar"]){color:red}');
  }
);

it('should transform a `attribute *` selector nested inside another block',
  () =>
  {
    const input = 'div{attribute data-foo{color=red\n}}';

    expect(engine(input)).toBe('div[data-foo]{color:red}');
  }
);