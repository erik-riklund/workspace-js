import { it, expect } from 'bun:test'
import { renderTreeToString } from '..'

// The tests in this file are used to verify that the renderer throws errors when it
// encounters syntax errors, such as nested media queries, in the input string.

it('should throw an error when encountering selectors mixed with media queries',
  () =>
  {
    const tree = [
      {
        selectors: ['@media screen and(min-width:576px)', 'h1'],
        metadata: { start: { line: 1, column: 1 } }
      }
    ];

    expect(() => renderTreeToString(tree)).toThrowError('Selectors mixed with media query');
  }
);

it('should throw an error when encountering nested media queries',
  () =>
  {
    const tree = [
      {
        selectors: ['@media screen and(min-width:576px)'],
        metadata: { start: { line: 1, column: 1 } },
        children: [
          {
            selectors: ['@media screen and(min-width:768px)'],
            metadata: { start: { line: 1, column: 1 } }
          }
        ]
      }
    ];

    expect(() => renderTreeToString(tree)).toThrowError('Nested responsive media queries');
  }
);

it('should throw an error on nested color-scheme media queries',
  () =>
  {
    const tree = [
      {
        selectors: ['@media (prefers-color-scheme: dark)'],
        metadata: { start: { line: 1, column: 1 } },
        children: [
          {
            selectors: ['@media (prefers-color-scheme: light)'],
            metadata: { start: { line: 1, column: 1 } }
          }
        ]
      }
    ];

    expect(() => renderTreeToString(tree)).toThrowError('Nested color scheme media queries');
  }
);

it('should throw an error when encountering property declarations without a parent reference',
  () =>
  {
    const tree = [
      {
        selectors: ['@media screen and (min-width: 576px)'],
        properties: [{ key: 'color', value: 'red' }],
        metadata: { start: { line: 1, column: 1 } }
      }
    ];

    expect(() => renderTreeToString(tree)).toThrowError('Property declaration outside block');
  }
);