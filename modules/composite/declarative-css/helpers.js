const SPACE = ' ';

/**
 * Parses a selector string into an object where keys are labels and values
 * are corresponding segments from the selector. Segments in the selector are
 * separated by spaces, unless enclosed in single quotes.
 * 
 * @param {string[]} labels
 * @param {string} selector
 * 
 * @returns {Record<string, string>}
 */
export const parseSelector = (labels, selector) =>
{
  const segments = [];
  let currentSegmentIndex = 0;
  let isQuotedValue = false;

  for (let i = 0; i < selector.length; i++)
  {
    if (typeof segments[currentSegmentIndex] !== 'string')
    {
      segments[currentSegmentIndex] = '';
    }

    const currentCharacter = selector[i];
    const currentSegment = segments[currentSegmentIndex];

    if (!isQuotedValue && currentCharacter === SPACE)
    {
      if (!currentSegment.trim())
      {
        // The current segment is empty (or white-space only).
        // We ignore the current space character and move on to the next iteration.

        continue;
      }

      currentSegmentIndex++;
    }
    else
    {
      if (currentCharacter === "'")
      {
        isQuotedValue = !isQuotedValue;
      }
      else
      {
        segments[currentSegmentIndex] += currentCharacter;
      }
    }
  }

  if (currentSegmentIndex + 1 > labels.length)
  {
    // The selector contains more segments than there are labels provided.
    // This indicates an invalid selector format for the given labels.

    throw new Error(`Recieved more values than labels (${labels.join(', ')}).`);
  }

  return Object.fromEntries(
    labels.map((label, index) => [label, segments[index]])
  );
}