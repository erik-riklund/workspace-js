import { handleAmpersand } from './delimiters/ampersand'
import { handleAtSign } from './delimiters/at-sign'
import { handleClosingBrace } from './delimiters/closing-brace'
import { handleColon } from './delimiters/colon'
import { handleComma } from './delimiters/comma'
import { handleDoubleQuote } from './delimiters/double-quote'
import { handleOpeningBrace } from './delimiters/opening-brace'
import { handleSemicolon } from './delimiters/semicolon'

/**
 * ?
 */
export const delimiterHandlers = {
  handleAmpersand,
  handleAtSign,
  handleClosingBrace,
  handleColon,
  handleComma,
  handleDoubleQuote,
  handleOpeningBrace,
  handleSemicolon
};