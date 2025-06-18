// @ts-nocheck

import { it, expect } from 'bun:test'
import { renderTreeToString } from '..'

// The tests in this file are used to verify that the renderer correctly renders
// the given input tree into the expected output string.

it('should not render an empty block',
  () =>
  {
    const tree = [{ selectors: ['h1'] }];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render a block with properties',
  () =>
  {
    const tree = [
      {
        selectors: ['h1'],
        properties: [
          { key: 'color', value: 'red' },
          { key: 'background-color', value: 'blue' }
        ],
      }
    ];

    expect(renderTreeToString(tree)).toEqual('h1{color:red;background-color:blue}');
  }
);

it('should not render an empty block with multiple selectors',
  () =>
  {
    const tree = [{ selectors: ['h1', 'h2'] }];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render a block with multiple selectors and properties',
  () =>
  {
    const tree = [
      {
        selectors: ['h1', 'h2'],
        properties: [
          { key: 'color', value: 'red' },
          { key: 'background-color', value: 'blue' }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual('h1,h2{color:red;background-color:blue}');
  }
);

it('should not render empty nested blocks',
  () =>
  {
    const tree = [
      {
        selectors: ['div'],
        children: [
          { selectors: ['h1'] }, { selectors: ['span'] }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual('');
  }
);

it('should render nested blocks with properties',
  () =>
  {
    const tree = [
      {
        selectors: ['div'],
        children: [
          {
            selectors: ['h1'],
            properties: [
              { key: 'color', value: 'red' },
              { key: 'background-color', value: 'blue' }
            ]
          },
          {
            selectors: ['span'],
            properties: [
              { key: 'color', value: 'blue' },
              { key: 'background-color', value: 'red' }
            ],
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
    const tree = [
      {
        selectors: ['div'],
        children: [
          {
            selectors: ['h1'],
            children: [
              {
                selectors: ['span'],
                properties: [
                  { key: 'color', value: 'red' }
                ]
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
    const tree = [
      {
        selectors: ['@media screen and (min-width: 576px)'],
        children: [
          {
            selectors: ['h1'],
            properties: [{ key: 'color', value: 'red' }]
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
    const tree = [
      {
        selectors: ['div'],
        children: [
          {
            selectors: ['h1'],
            properties: [{ key: 'color', value: 'red' }]
          }
        ]
      },
      {
        selectors: ['@media screen and (min-width: 576px)'],
        children: [
          {
            selectors: ['h2'],
            properties: [{ key: 'color', value: 'blue' }]
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
    const tree = [
      {
        selectors: ['div'],
        properties: [{ key: 'color', value: 'red' }],
        children: [
          {
            selectors: ['@media screen and (min-width: 576px)'],
            properties: [{ key: 'color', value: 'blue' }]
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
    const tree = [
      {
        selectors: [
          '@media (prefers-color-scheme: dark)'
        ],
        children: [
          {
            selectors: ['h1'],
            properties: [{ key: 'color', value: 'white' }]
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
    const tree = [
      {
        selectors: [
          '@media screen and(min-width:576px)'
        ],
        children: [
          {
            selectors: ['h1'],
            properties: [{ key: 'color', value: 'black'}],
            children: [
              {
                selectors: [
                  '@media(prefers-color-scheme:dark)'
                ],
                properties: [
                  { key: 'color', value: 'white'}
                ]
              }
            ]
          }
        ]
      }
    ];

    expect(renderTreeToString(tree)).toEqual(
      '@media screen and(min-width:576px){h1{color:black}}' +
      '@media screen and(min-width:576px)and(prefers-color-scheme:dark){h1{color:white}}'
    );
  }
);