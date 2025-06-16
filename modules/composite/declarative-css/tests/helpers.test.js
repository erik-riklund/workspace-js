import { it, expect } from 'bun:test'
import { parseSelector } from '../helpers'

it('should parse a selector with a single label',
  () =>
  {
    const result = parseSelector(
      'group *', ['name'], 'group foo'
    );

    expect(result).toEqual({ name: 'foo' });
  }
);

it('should parse a selector with a single label wrapped in single quotes',
  () =>
  {
    const result = parseSelector(
      'group *', ['name'], 'group \'foo\''
    );

    expect(result).toEqual({ name: 'foo' });
  }
);

it('should parse a selector with a single label wrapped in double quotes',
  () =>
  {
    const result = parseSelector(
      'group *', ['name'], 'group "foo"'
    );

    expect(result).toEqual({ name: 'foo' });
  }
);

it('should parse a selector with multiple labels',
  () =>
  {
    const result = parseSelector(
      'group * is *', ['name', 'value'], 'group foo is bar'
    );

    expect(result).toEqual({ name: 'foo', value: 'bar' });
  }
);

it('should parse a selector with a label containing spaces (single quotes)',
  () =>
  {
    const result = parseSelector(
      'group * is **', ['name','value'], "group foo is 'foo bar'"
    );

    expect(result).toEqual({ name: 'foo', value: 'foo bar' });
  }
);

it('should parse a selector with a label containing spaces (double quotes)',
  () =>
  {
    const result = parseSelector(
      'group * is **', ['name','value'], 'group foo is "foo bar"'
    );

    expect(result).toEqual({ name: 'foo', value: 'foo bar' });
  }
);