import { handleClosingBrace } from './handlers/closing-brace'
import { handleOpeningBrace } from './handlers/opening-brace'
import { handleProperty } from './handlers/property'

/**
 * ?
 * 
 * @param {string} input
 * @returns {CssEngine.AbstractTree}
 */
export const createTreeFromString = (input) =>
{
  const state = makeParserState(
    input.split(/\r?\n/).map((line) => line.trim())
  );

  try
  {
    while (typeof state.currentLine === 'string')
    {
      handleLine(state);

      state.currentLineIndex++;
    }

    if (state.currentBlock)
    {
      throw new Error('Unexpected end of string (missing closing brace)');
    }

    return state.tree;
  }
  catch (error)
  {
    throw new Error(
      `css-engine: ${error.message} @ line ${state.currentLineIndex + 1}`
    );
  }
}

/**
 * ?
 * 
 * @param {string[]} lines
 */
export const makeParserState = (lines) =>
{
  return {
    tree: [],
    stack: [],
    buffer: [],

    currentLineIndex: 0,

    get currentLine ()
    {
      return lines[this.currentLineIndex] || null;
    },

    get nextLine ()
    {
      return lines[this.currentLineIndex + 1] || null;
    },

    get previousLine ()
    {
      return lines[this.currentLineIndex - 1] || null;
    },

    /**
     * @returns {MaybeNull<CssEngine.Block>}
     */
    get currentBlock ()
    {
      return this.stack[this.stack.length - 1] || null;
    }
  }
}

/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
const handleLine = (state) =>
{
  const currentLine = state.currentLine;

  if (currentLine === '{')
  {
    handleOpeningBrace(state);
  }
  else if (currentLine === '}')
  {
    handleClosingBrace(state);
  }
  else
  {
    if (currentLine.endsWith('{'))
    {
      state.buffer.push(currentLine.slice(0, -1).trim());

      handleOpeningBrace(state);
    }
    else
    {
      state.buffer.push(currentLine);

      handleProperty(state);
    }
  }
}