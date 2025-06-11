import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '..'

const engine = makeAbstractCssEngine();

it('should transform an `attribute *` selector',
  () =>
  {
    const input = 'attribute data-foo\n{\ncolor:red\n}';

    expect(engine(input)).toBe('[data-foo]{color:red}');
  }
);

it('should transform an `attribute * is missing` selector',
  () =>
  {
    const input = 'attribute data-foo is missing\n{\ncolor:red\n}';

    expect(engine(input)).toBe(':not([data-foo]){color:red}');
  }
);

it('should transform an `attribute * is "?"` selector',
  () =>
  {
    const input = 'attribute data-foo is "bar"\n{\ncolor:red\n}';

    expect(engine(input)).toBe('[data-foo="bar"]{color:red}');
  }
);

it('should transform an `attribute * is not "?"` selector',
  () =>
  {
    const input = 'attribute data-foo is not "bar"\n{\ncolor:red\n}';

    expect(engine(input)).toBe(':not([data-foo="bar"]){color:red}');
  }
);

it('should transform an `attribute *` selector nested inside another block',
  () =>
  {
    const input = 'div\n{\nattribute data-foo\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div[data-foo]{color:red}');
  }
);