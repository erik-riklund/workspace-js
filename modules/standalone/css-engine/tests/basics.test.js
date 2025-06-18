import { it, expect } from 'bun:test'
import { makeEngine } from '..'

const engine = makeEngine();

it('should return a minified version of the input',
  () => expect(engine('h1 { color: red; }')).toBe('h1{color:red}')
);

it('should return a flattened version of the input',
  () =>
  {
    const input = 'form { & input { color: red; } & button { color: blue; &:hover { color: pink; } } }';
    
    expect(engine(input)).toBe('form input{color:red}form button{color:blue}form button:hover{color:pink}');
  }
);