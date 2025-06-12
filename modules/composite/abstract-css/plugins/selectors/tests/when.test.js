import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '../../..'

const engine = makeAbstractCssEngine();

it('should transform a `when *` selector',
  () =>
  {
    const input = 'button\n{\nwhen disabled\n{\ncolor:gray\n}\n}';

    expect(engine(input)).toBe('button:disabled{color:gray}');
  }
);

it('should transform a `when not *` selector',
  () =>
  {
    const input = 'button\n{\nwhen not disabled\n{\ncolor:gray\n}\n}';

    expect(engine(input)).toBe('button:not(:disabled){color:gray}');
  }
);

it('should transform a `when *` selector with a special case',
  () =>
  {
    const input = 'fieldset\n{\nwhen focused within\n{\nborder-color:red\n}\n}';

    expect(engine(input)).toBe('fieldset:focus-within{border-color:red}');
  }
);