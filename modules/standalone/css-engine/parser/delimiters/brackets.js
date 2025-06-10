/**
 * @param {CssParserState} state
 */
export const handleOpeningBracket = (state) =>
{
  if (!state.isProperty)
  {
    // If we're not inside a property value, we're inside a selector. We update
    // the state accordingly, which is required to properly handle the assignment
    // operator in attribute selectors.

    state.isSelector = true;
  }

  state.buffer += '[';
}

/**
 * @param {CssParserState} state
 */
export const handleClosingBracket = (state) =>
{
  if (state.isSelector)
  {
    // If we're inside a selector, we update the state accordingly to signal that
    // subsequent assignment operators should be handled as property value assignments.

    state.isSelector = false;
  }

  state.buffer += ']';
}