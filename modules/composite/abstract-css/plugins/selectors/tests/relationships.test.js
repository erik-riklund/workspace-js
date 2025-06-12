import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '../../..'

const engine = makeAbstractCssEngine();

it('should transform a `child *` selector',
  () =>
  {
    const input = 'div\n{\nchild p\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div>p{color:red}');
  }
);

it('should transform a `child class *` selector',
  () =>
  {
    const input = 'div\n{\nchild class test\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div>.test{color:red}');
  }
);

it('should transform a `sibling *` selector',
  () =>
  {
    const input = 'div\n{\nsibling p\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div~p{color:red}');
  }
);

it('should transform a `sibling class *` selector',
  () =>
  {
    const input = 'div\n{\nsibling class test\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div~.test{color:red}');
  }
);

it('should transform a `adjacent *` selector',
  () =>
  {
    const input = 'div\n{\nadjacent p\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div+p{color:red}');
  }
);

it('should transform a `adjacent class *` selector',
  () =>
  {
    const input = 'div\n{\nadjacent class test\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div+.test{color:red}');
  }
);

it('should transform a `descendant *` selector',
  () =>
  {
    const input = 'div\n{\ndescendant p\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div p{color:red}');
  }
);

it('should transform a `descendant class *` selector',
  () =>
  {
    const input = 'div\n{\ndescendant class test\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe('div .test{color:red}');
  }
);