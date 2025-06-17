import { it, expect } from 'bun:test'
import { createTreeFromString } from '..'

it('should throw an error on reaching the end of the input string with unclosed blocks',
  () =>
  {
    const input = 'div\n{\n';

    expect(() => createTreeFromString(input)).toThrowError(
      'Unexpected end of string (missing closing brace)'
    );
  }
);

it('should throw an error when encountering an unexpected opening brace',
  () =>
  {
    const input = 'div\n{\n{\n';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected opening brace');
  }
);

it('should throw an error when encountering an unexpected closing brace',
  () =>
  {
    const input = 'div\n}';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected closing brace');
  }
);

it('should throw an error when encountering a property declaration outside a block',
  () =>
  {
    const input = 'div\n{color:red\n}\nbackground-color:blue';

    expect(() => createTreeFromString(input)).toThrowError('Property declaration outside block');
  }
);