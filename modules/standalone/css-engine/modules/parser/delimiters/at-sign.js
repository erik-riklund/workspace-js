/**
 * ?
 * 
 * @param {CssEngine.ParserState} state
 */
export const handleAtSign = (state) => 
{
  state.isAtSign = true;
  
  state.buffer += '@';
}