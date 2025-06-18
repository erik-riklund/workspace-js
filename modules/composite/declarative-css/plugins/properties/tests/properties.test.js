import { it, expect } from 'bun:test'
import { createDeclarativeEngine } from 'module/declarative-css'

const engine = createDeclarativeEngine();


it('should replace a single property declaration',
  () =>
  {
    const input = 'h1 { set color to red\n }';

    expect(engine(input)).toBe('h1{color:red}');
  }
);