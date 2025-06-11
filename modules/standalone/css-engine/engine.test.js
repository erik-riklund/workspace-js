import { makeEngine } from '.'
import { it, expect } from 'bun:test'

it('should transform properties that use standard CSS syntax',
  () =>
  {
    const input = 'div\n{\ncolor:red\n}';

    expect(makeEngine()(input)).toBe('div{color:red}');
  }
);