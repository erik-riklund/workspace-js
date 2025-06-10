import { ParsingError } from './errors'

import { handleOpeningBrace } from './delimiters/braces'
import { handleClosingBrace } from './delimiters/braces'
import { handleOpeningBracket } from './delimiters/brackets'
import { handleClosingBracket } from './delimiters/brackets'
import { handleAssignmentOperator } from './delimiters/assignment'
import { handleLineBreak } from './delimiters/line-break'
import { handleForwardSlash } from './delimiters/forward-slash'
import { handleExclamationMark } from './delimiters/exclamation'

/**
 * Parse the provided input string and return a tree representation of it.
 * 
 * @param {string} input The input string to be parsed.
 * @returns {CssParserAbstractTree} A tree structure containing the parsed input broken down into blocks.
 * Each block has selectors, metadata, optional properties and possibly nested child blocks.
 */
export const createTreeFromString = (input) =>
{
  /** @type {CssParserState} */
  const state =
  {
    tree: [],
    stack: [],
    buffer: '',

    currentPosition: 0,
    currentLine: 1,
    currentColumn: 1,
    currentProperty: '',
    customProperty: null,

    isComment: false,
    isSelector: false,
    isProperty: false,
    isValue: false
  };

  // The parser works by iterating over the input string character by character,
  // with each special delimiter being handled by a corresponding function.

  while (state.currentPosition < input.length)
  {
    const currentCharacter = input[state.currentPosition];

    switch (currentCharacter)
    {
      case '{': handleOpeningBrace(state); break;
      case '}': handleClosingBrace(state); break;
      case '[': handleOpeningBracket(state); break;
      case ']': handleClosingBracket(state); break;

      case '=': handleAssignmentOperator(state); break;
      case '/': handleForwardSlash(state); break;
      case '!': handleExclamationMark(state); break;
      case '\n': handleLineBreak(state); break;

      default: handleRest(state, currentCharacter); break;
    }

    state.currentLine += (currentCharacter === '\n') ? 1 : 0;
    state.currentColumn = (currentCharacter === '\n') ? 1 : state.currentColumn + 1;

    state.currentPosition++;
  }

  if (state.stack.length > 0)
  {
    // The parser reached the end of the input string, but there are still open
    // blocks in the stack. This is reported as an unexpected end of string error,
    // pointing out that a closing brace '}' is missing.

    throw new ParsingError('Unexpected end of string (missing closing brace)', state);
  }

  return state.tree;
};

/**
 * @param {CssParserState} state
 * @param {string} character
 */
const handleRest = (state, character) =>
{
  if (!state.isComment)
  {
    //

    if (state.customProperty)
    {
      // 

      const property = state.customProperty;

      if (property.key === '!' && character === ' ')
      {
        property.key = `!${ state.buffer.trim() }`;

        state.buffer = '';
      }
    }

    state.buffer += character;
  }
}