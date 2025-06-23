/**
 * ?
 * 
 * @returns {CssEngine.InputPlugin}
 */
export const createVariablesPlugin = () =>
{
  // ...

  return {
    stage: 'input',
    
    handler: (input) => 
    {
      // ...

      return input;
    }
  };
}