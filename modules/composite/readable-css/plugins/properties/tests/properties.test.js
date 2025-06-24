import { it, expect } from 'bun:test'
import { handleProperty } from '../helpers'

it('should replace a single property declaration',
  () =>
  {
    const input = 'h1 { set color to red; }';
    const result = handleProperty('set * to **', input);

    expect(result).toBe('h1 { color:red; }');
  }
);

it('should replace multiple property declarations',
  () =>
  {
    const input = 'h1 { set color to red; set background-color to blue; }';
    const result = handleProperty('set * to **', input);

    expect(result).toBe('h1 { color:red; background-color:blue; }');
  }
);

it('should replace a property that has a function value',
  () =>
  {
    const input = 'h1 { set color to rgb(0, 0, 0); }';
    const result = handleProperty('set * to **', input);

    expect(result).toBe('h1 { color:rgb(0, 0, 0); }');
  }
);