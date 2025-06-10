import { it, expect } from 'bun:test'
import { makeEngine } from '..'

it('should parse and render a basic stylesheet',
  () =>
  {
    const input = 'h1{color=red\n}form{input{&:valid{border-color=green\n}}button{color=black\n&:disabled{color=gray\n}}}';

    expect(makeEngine()(input)).toBe(
      'h1{color:red}form input:valid{border-color:green}form button{color:black}form button:disabled{color:gray}'
    );
  }
);