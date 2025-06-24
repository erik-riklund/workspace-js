import { it, expect } from 'bun:test'
import { handleCustomProperty } from '../helpers'

it('should replace a custom `include` property (single line)',
  () =>
  {
    const input = 'h1 { include test, test2; }';
    const result = handleCustomProperty(
      'include **', input, (blocks) => `!include: ${blocks}`
    );

    expect(result).toBe('h1 { !include: test, test2; }');
  }
);

it('should replace a custom `include` property (multi-line)',
  () =>
  {
    const input = 'h1 { include test,\n  test2,\ntest3; }';
    const result = handleCustomProperty(
      'include **', input, (blocks) => `!include: ${blocks}`
    );

    expect(result).toBe('h1 { !include: test,\n  test2,\ntest3; }');
  }
);