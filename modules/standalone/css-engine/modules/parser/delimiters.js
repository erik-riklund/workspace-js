import { ParsingError } from '.'

/**
 * ?
 */
export const delimiters =
{
  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleOpeningBrace: (state) =>
  {
    const selector = state.buffer.trim();

    if (selector.length === 0)
    {
      throw new ParsingError('Unexpected opening brace', state);
    }

    const block = {
      selectors: [...state.selectorStack, selector],
      metadata: { start: { line: state.currentLine, column: state.currentColumn } }
    };

    if (block.selectors.length > 1 && block.selectors.some(s => s.startsWith('@')))
    {
      throw new ParsingError('At-rule mixed with other selectors', state);
    }

    if (state.stack.length > 0)
    {
      const parent = state.stack[state.stack.length - 1];

      parent.children = parent.children ? [...parent.children, block] : [block];
    }
    else
    {
      state.tree.push(block); // root-level block.
    }

    state.stack.push(block);

    state.selectorStack = [];
    state.isNestedSelector = false;
    state.buffer = '';
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleClosingBrace: (state) =>
  {
    if (state.stack.length === 0 || state.currentPropertyName)
    {
      throw new ParsingError('Unexpected closing brace', state);
    }

    const block = state.stack.pop();

    block.metadata.end = {
      line: state.currentLine, column: state.currentColumn
    };

    state.buffer = '';
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleSemicolon: (state) => 
  {
    if (state.isStringLiteral)
    {
      state.buffer += ';';

      return; // early exit > a string literal.
    }

    const value = state.buffer.trim();

    if (!state.currentPropertyName || !value)
    {
      throw new ParsingError(
        'Unexpected semicolon (expected property declaration)', state
      );
    }

    const currentBlock = state.stack[state.stack.length - 1];

    if (!currentBlock)
    {
      throw new ParsingError(
        'Unexpected semicolon (outside block)', state
      );
    }

    const property = { key: state.currentPropertyName, value };

    if (!currentBlock.properties)
    {
      currentBlock.properties = [];
    }

    currentBlock.properties.push(property);

    state.currentPropertyName = '';
    state.buffer = '';
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleColon: (state) => 
  {
    if (
      state.isAtSign ||
      state.isStringLiteral ||
      state.isNestedSelector ||
      state.stack.length === 0)
    {
      state.buffer += ':';

      return; // early exit > a string literal or nested selector.
    }

    if (state.currentPropertyName)
    {
      throw new ParsingError(
        'Unexpected colon (expected property value)', state
      );
    }

    state.currentPropertyName = state.buffer.trim();
    state.buffer = '';
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleComma: (state) => 
  {
    if (state.isStringLiteral ||
      state.currentPropertyName ||
      state.currentParenthesisLevel > 0)
    {
      state.buffer += ',';

      return; // early exit > string literal, property value, or inside parenthesis.
    }

    if (state.currentParenthesisLevel === 0)
    {
      const selector = state.buffer.trim();

      if (!selector)
      {
        throw new ParsingError(
          'Unexpected comma (expected selector)', state
        );
      }

      state.selectorStack.push(selector);
      state.buffer = '';
    }
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleAmpersand: (state) => 
  {
    state.buffer += '&';

    if (!state.isStringLiteral)
    {
      state.isNestedSelector = true;
    }
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleAtSign: (state) => 
  {
    state.buffer += '@';
    state.isAtSign = true;
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleDoubleQuote: (state) => 
  {
    state.buffer += '"';

    if (state.isStringLiteral)
    {
      state.isStringLiteral = (
        state.buffer[state.buffer.length - 2] === '\\'
      );
    }
    else
    {
      state.isStringLiteral = true;
    }
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleOpeningParenthesis: (state) => 
  {
    state.buffer += '(';

    if (!state.isStringLiteral)
    {
      state.currentParenthesisLevel++;
    }
  },

  /**
   * ?
   * 
   * @param {CssEngine.ParserState} state
   */
  handleClosingParenthesis: (state) => 
  {
    state.buffer += ')';

    if (!state.isStringLiteral)
    {
      state.currentParenthesisLevel--;
    }
  }
}