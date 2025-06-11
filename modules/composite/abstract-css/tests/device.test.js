import { it, expect } from 'bun:test'
import { makeAbstractCssEngine } from '..'

const engine = makeAbstractCssEngine();

it('should transform a `device *` selector',
  () =>
  {
    const input = 'device tablet\n{\nspan\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe(
      '@media screen and(min-width:576px)and(max-width:1023px){span{color:red}}'
    );
  }
);

it('should transform a `device * ..` selector',
  () =>
  {
    const input = 'device tablet ..\n{\nspan\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe(
      '@media screen and(min-width:576px){span{color:red}}'
    );
  }
);

it('should transform a `device .. *` selector',
  () =>
  {
    const input = 'device .. tablet\n{\nspan\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe(
      '@media screen and(max-width:1023px){span{color:red}}'
    );
  }
);

it('should transform a `device * .. *` selector',
  () =>
  {
    const input = 'device tablet .. laptop\n{\nspan\n{\ncolor:red\n}\n}';

    expect(engine(input)).toBe(
      '@media screen and(min-width:576px)and(max-width:1439px){span{color:red}}'
    );
  }
);

it('should throw an error when encountering an unknown device name',
  () =>
  {
    const input = 'device foo\n{\nspan\n{\ncolor:red\n}\n}';

    expect(() => engine(input)).toThrowError('Unknown device: foo');
  }
);