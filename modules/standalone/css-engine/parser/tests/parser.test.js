import { it, expect } from 'bun:test'
import { createTreeFromString } from '..'

// The tests in this file are used to verify that the parser correctly parses
// the given input strings into the expected tree structure.

it('should parse a single block without properties',
  () =>
  {
    const input = 'div{}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 1, column: 5 }
        }
      }
    ]);
  }
);

it('should parse nested blocks without properties',
  () =>
  {
    const input = 'div{h1{}span{}}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 1, column: 15 }
        },
        children: [
          {
            selectors: ['h1'],
            metadata: {
              startsAt: { line: 1, column: 7 },
              endsAt: { line: 1, column: 8 }
            }
          },
          {
            selectors: ['span'],
            metadata: {
              startsAt: { line: 1, column: 13 },
              endsAt: { line: 1, column: 14 }
            }
          }
        ]
      }
    ]);
  }
);

it('should parse a block with a single property',
  () =>
  {
    const input = 'div{color=red\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        properties: [
          { key: 'color', value: 'red', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 2, column: 1 }
        }
      }
    ]);
  }
);

it('should parse a block with multiple properties',
  () =>
  {
    const input = 'div{color=red\nbackground-color=blue\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        properties: [
          { key: 'color', value: 'red', line: 1 },
          { key: 'background-color', value: 'blue', line: 2 }
        ],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 3, column: 1 }
        }
      }
    ]);
  }
);

it('should parse nested blocks with properties',
  () =>
  {
    const input = 'div{color=yellow\nh1{color=red\n}span{color=blue\n}}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        properties: [
          { key: 'color', value: 'yellow', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 4, column: 2 }
        },

        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'red', line: 2 }
            ],
            metadata: {
              startsAt: { line: 2, column: 3 },
              endsAt: { line: 3, column: 1 }
            }
          },
          {
            selectors: ['span'],
            properties: [
              { key: 'color', value: 'blue', line: 3 }
            ],
            metadata: {
              startsAt: { line: 3, column: 6 },
              endsAt: { line: 4, column: 1 }
            }
          }
        ]
      }
    ]);
  }
);

it('should parse a custom property declaration ending with a closing brace',
  () =>
  {
    const input = 'div{!include black border, white background}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        properties: [
          { key: '!include', value: 'black border, white background', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 1, column: 44 }
        }
      }
    ]);
  }
);

it('should parse a custom property declaration ending with a double line break',
  () =>
  {
    const input = 'div{!include black border, white background\n\ncolor = red\n}';

    expect(createTreeFromString(input)).toEqual([
      {
        selectors: ['div'],
        properties: [
          { key: '!include', value: 'black border, white background', line: 1 },
          { key: 'color', value: 'red', line: 3 }
        ],
        metadata: {
          startsAt: { line: 1, column: 4 },
          endsAt: { line: 4, column: 1 }
        }
      }
    ]);
  }
);