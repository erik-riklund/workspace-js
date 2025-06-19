import { it, expect, beforeEach } from 'bun:test'
import { createDeclarativeEngine } from 'module/declarative-css'

let engine;

beforeEach(() => engine = createDeclarativeEngine());

it('should not render reusable block declarations',
  () =>
  {
    const input = 'reusable `test` { color: red; }';

    expect(engine(input)).toBe('');
  }
);

it('should render the properties from the specified reusable block',
  () =>
  {
    const input = 'reusable `test` { color: red; } span { !include: test; }';

    expect(engine(input)).toBe('span{color:red}');
  }
);

it('should render the properties from the specified reusable blocks',
  () =>
  {
    const input = 'reusable `test` { color: red; }' +
      'reusable `test2` { background-color: pink; } span { !include: test, test2; }';

    expect(engine(input)).toBe('span{color:red;background-color:pink}');
  }
);