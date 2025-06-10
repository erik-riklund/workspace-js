import { it, expect } from 'bun:test'
import { renderTreeToString } from '..'

// The tests in this file are used to verify that the renderer correctly renders
// the given input tree into the expected output string.

it('should not render an empty block',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['h1'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        }
      }
    ];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render a block with properties',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'red', line: 1 },
          { key: 'background-color', value: 'blue', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        }
      }
    ];

    expect(renderTreeToString(tree)).toEqual('h1{color:red;background-color:blue}');
  }
);

it('should not render an empty block with multiple selectors',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['h1', 'h2'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        }
      }
    ];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render a block with multiple selectors and properties',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['h1', 'h2'],
        properties: [
          { key: 'color', value: 'red', line: 1 },
          { key: 'background-color', value: 'blue', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        }
      }
    ];

    expect(renderTreeToString(tree)).toEqual('h1,h2{color:red;background-color:blue}');
  }
);

it('should not render empty nested blocks',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          },
          {
            selectors: ['span'],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render nested blocks with properties',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'red', line: 1 },
              { key: 'background-color', value: 'blue', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          },
          {
            selectors: ['span'],
            properties: [
              { key: 'color', value: 'blue', line: 1 },
              { key: 'background-color', value: 'red', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      'div h1{color:red;background-color:blue}div span{color:blue;background-color:red}'
    );
  }
);

it('should render a deeply nested block with a single property',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            },
            children: [
              {
                selectors: ['span'],
                properties: [
                  { key: 'color', value: 'red', line: 1 }
                ],
                metadata: {
                  startsAt: { line: 1, column: 1 },
                  endsAt: { line: 1, column: 1 }
                }
              }
            ]
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual('div h1 span{color:red}');
  }
);

it('should render a block inside a responsive media query',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['@media screen and (min-width: 576px)'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'red', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      '@media screen and (min-width: 576px){h1{color:red}}'
    );
  }
);

it('should render root-level blocks alongside responsive media queries',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['div'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'red', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      },
      {
        selectors: ['@media screen and (min-width: 576px)'],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h2'],
            properties: [
              { key: 'color', value: 'blue', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      'div h1{color:red}@media screen and (min-width: 576px){h2{color:blue}}'
    );
  }
);

it('should render properties inside a responsive media query nested inside another block',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: ['div'],
        properties: [
          { key: 'color', value: 'red', line: 1 }
        ],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['@media screen and (min-width: 576px)'],
            properties: [
              { key: 'color', value: 'blue', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      'div{color:red}@media screen and (min-width: 576px){div{color:blue}}'
    );
  }
);

it('should render a `prefers-color-scheme` media query',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: [
          '@media (prefers-color-scheme: dark)'
        ],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'white', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            }
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      '@media (prefers-color-scheme: dark){h1{color:white}}'
    );
  }
);

it('should append a `prefers-color-scheme` media query to an active responsive media query',
  () =>
  {
    /** @type {CssParserAbstractTree} */
    const tree = [
      {
        selectors: [
          '@media screen and (min-width: 576px)'
        ],
        metadata: {
          startsAt: { line: 1, column: 1 },
          endsAt: { line: 1, column: 1 }
        },
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'black', line: 1 }
            ],
            metadata: {
              startsAt: { line: 1, column: 1 },
              endsAt: { line: 1, column: 1 }
            },
            children: [
              {
                selectors: [
                  '@media (prefers-color-scheme: dark)'
                ],
                properties: [
                  { key: 'color', value: 'white', line: 1 }
                ],
                metadata: {
                  startsAt: { line: 1, column: 1 },
                  endsAt: { line: 1, column: 1 }
                }
              }
            ]
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      '@media screen and (min-width: 576px){h1{color:black}}' +
      '@media screen and (min-width: 576px)and(prefers-color-scheme: dark){h1{color:white}}'
    );
  }
);