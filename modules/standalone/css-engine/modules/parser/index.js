import { delimiters as d } from './delimiters'

/**
 * ?
 * 
 * @param {string} input
 * @returns {CssEngine.AbstractTree}
 */
export const createTreeFromString = (input) =>
{
  const state = makeParserState();

  while (state.currentPosition < input.length)
  {
    const currentCharacter = input[state.currentPosition];

    switch (currentCharacter)
    {
      case '{': d.handleOpeningBrace(state); break;
      case '}': d.handleClosingBrace(state); break;
      case '(': d.handleOpeningParenthesis(state); break;
      case ')': d.handleClosingParenthesis(state); break;
      
      case ';': d.handleSemicolon(state); break;
      case ',': d.handleComma(state); break;
      case ':': d.handleColon(state); break;
      case '&': d.handleAmpersand(state); break;
      case '@': d.handleAtSign(state); break;
      case '"': d.handleDoubleQuote(state); break;

      default: state.buffer += currentCharacter;
    }

    state.currentLine += (currentCharacter === '\n') ? 1 : 0;
    state.currentColumn = (currentCharacter === '\n') ? 1 : state.currentColumn + 1;

    state.currentPosition++;
  }

  if (state.stack.length > 0)
  {
    throw new ParsingError(
      'Unexpected end of string (missing closing brace)', state
    );
  }

  return state.tree;
}

/**
 * ?
 */
export const makeParserState = () =>
{
  return {
    /**
     * The buffer holds the characters that are currently being parsed.
     */
    buffer: '',

    /**
     * Holds the root of the abstract tree, which is an array of blocks.
     * Each block contains selectors, properties, and potentially nested blocks.
     * 
     * @type {CssEngine.AbstractTree}
     */
    tree: [],

    /**
     * Holds the stack of blocks that are currently being parsed.
     * The stack maintains the hierarchy of nested blocks.
     * 
     * @type {CssEngine.Block[]}
     */
    stack: [],

    /**
     * Tracks the current position in the input string.
     */
    currentPosition: 0,

    /**
     * Tracks the current line in the input string.
     */
    currentLine: 1,

    /**
     * Tracks the current column in the input string.
     */
    currentColumn: 1,

    /**
     * Tracks the name of the property that is currently being parsed.
     */
    currentPropertyName: '',

    /**
     * Tracks the current parenthesis level. Used when parsing selectors.
     */
    currentParenthesisLevel: 0,

    /**
     * Holds the selectors for the block that is currently being parsed.
     * 
     * @type {string[]}
     */
    selectorStack: [],

    /**
     * Indicates whether an at-rule is currently being parsed.
     */
    isAtRule: false,

    /**
     * Indicates whether a custom property is currently being parsed.
     */
    isCustomProperty: false,

    /**
     * Indicates whether a nested selector is currently being parsed.
     */
    isNestedSelector: false,

    /**
     * Indicates whether a string literal is currently being parsed.
     */
    isStringLiteral: false
  }
}

/**
 * ?
 */
export class ParsingError extends Error
{
  /**
   * ?
   * 
   * @param {string} message
   * @param {CssEngine.ParserState} state
   */
  constructor(message, state)
  {
    super(`Parsing error: ${message} @ line ${state.currentLine} (column ${state.currentColumn}).`);

    this.name = 'ParsingError';
  }
}