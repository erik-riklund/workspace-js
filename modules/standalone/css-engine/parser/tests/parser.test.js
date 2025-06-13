import { it, expect } from 'bun:test'
import { createTreeFromString } from '..'

it('should return an empty tree when the input string is empty',
  () =>
  {
    expect(createTreeFromString('')).toEqual([]);
  }
);

it('should parse an empty block with the opening brace on a separate line',
  () =>
  {
    const input = 'div\n{\n}'

    expect(createTreeFromString(input)).toEqual([
      { selectors: ['div'], metadata: { line: 2 } }
    ]);
  }
);

it('should parse an empty block with the opening brace on the same line',
  () =>
  {
    const input = 'div {\n}'

    expect(createTreeFromString(input)).toEqual([
      { selectors: ['div'], metadata: { line: 1 } }
    ]);
  }
);

it('should parse nested empty blocks',
  () =>
  {
    const input = 'div{\nspan{\n}\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'], metadata: { line: 1 },
        children: [{ selectors: ['span'], metadata: { line: 2 } }]
      }
    ]);
  }
);

it('should parse a block with a single property',
  () =>
  {
    const input = 'div{\ncolor:red\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'], metadata: { line: 1 },
        rawProperties: ['color:red']
      }
    ]);
  }
);

it('should parse a block with a single custom property',
  () =>
  {
    const input = 'div{\n!test hello\nworld.\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'], metadata: { line: 1 },
        rawProperties: ['!test hello world.']
      }
    ]);
  }
);

it('should parse a block with multiple properties',
  () =>
  {
    const input = 'div{\ncolor:red\nbackground-color:blue\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'], metadata: { line: 1 },
        rawProperties: ['color:red', 'background-color:blue']
      }
    ]);
  }
);

it('should parse nested blocks with properties',
  () =>
  {
    const input = 'div{\nspan{\ncolor:red\n}\nh1{\nbackground-color:blue\n}\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'], metadata: { line: 1 },
        children: [
          {
            selectors: ['span'], metadata: { line: 2 },
            rawProperties: ['color:red']
          },
          {
            selectors: ['h1'], metadata: { line: 5 },
            rawProperties: ['background-color:blue']
          }
        ]
      }
    ]);
  }
);