import { it, expect } from 'bun:test'
import { createTreeFromString } from '..';

// The tests in this file are used to verify that the parser throws errors when it
// encounters syntax errors, such as unexpected characters, in the input string.

it('should throw an error when encountering an unexpected opening brace',
  () =>
  {
    const input = 'h1{color=red\n}h2{{background-color=blue\n}';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected opening brace');
  }
);

it('should throw an error when encountering an unexpected closing brace',
  () =>
  {
    const input = 'h1{color=red\n}h2{background-color=blue\n}}';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected closing brace');
  }
);

it('should throw an error when the input string ends with unclosed blocks',
  () =>
  {
    const input = 'h1{color=red\n}h2{background-color=blue\n';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected end of string');
  }
);

it('should throw an error when encountering a property declaration outside a block',
  () =>
  {
    const input = 'h1{color=red\n}background-color=blue\n';

    expect(() => createTreeFromString(input)).toThrowError('Property declaration outside block');
  }
);

it('should throw an error when encountering a custom property declaration outside a block',
  () =>
  {
    const input = 'h1{color=red\n}!background-color=blue\n';

    expect(() => createTreeFromString(input)).toThrowError('Custom property declaration outside block');
  }
);

it('should throw an error when a line break is missing after a property value',
  () =>
  {
    const input = 'h1{color = red h2{color = blue}}';

    expect(() => createTreeFromString(input)).toThrowError('Missing line break after property value');
  }
);

it('should throw an error when encountering an unexpected assignment operator',
  () =>
  {
    const input = 'h1{color = red\n= h2{color = blue}}';

    expect(() => createTreeFromString(input)).toThrowError('Unexpected assignment operator');
  }
);

it('should throw an error when a property declaration is missing a value',
  () =>
  {
    const input = 'h1{color = \n}';

    expect(() => createTreeFromString(input)).toThrowError('Missing property value');
  }
);

it('should throw an error when a custom property declaration is missing a value',
  () =>
  {
    const input = 'div{!include \n\ncolor = red\n}';

    expect(() => createTreeFromString(input)).toThrowError('Missing custom property value');
  }
);