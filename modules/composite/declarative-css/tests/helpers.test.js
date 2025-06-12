import { it, expect } from 'bun:test'
import { parseSelector } from '../helpers'

// ----- parseSelector --------------------

it('should parse a basic selector',
  () =>
  {
    const selector = 'selector-name first second';
    const result = parseSelector(['foo', 'bar', 'foobar'], selector);

    expect(result).toEqual(
      { foo: 'selector-name', bar: 'first', foobar: 'second' }
    );
  }
);

it('should parse a selector with a quoted value',
  () =>
  {
    const selector = 'selector-name first \'second and third\'';
    const result = parseSelector(['foo', 'bar', 'foobar'], selector);

    expect(result).toEqual(
      { foo: 'selector-name', bar: 'first', foobar: 'second and third' }
    );
  }
);

it('should throw an error when there are more values than labels',
  () =>
  {
    const selector = 'selector-name first second';
    const result = () => parseSelector(['foo', 'bar'], selector);

    expect(result).toThrowError('Recieved more values than labels');
  }
);