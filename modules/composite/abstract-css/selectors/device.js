
const deviceRanges = {
  mobile: { lower: null, upper: '575px' },
  tablet: { lower: '576px', upper: '1023px' },
  laptop: { lower: '1024px', upper: '1439px' },
  desktop: { lower: '1440px', upper: null }
};

/** @param {string} selector */
export const handleDeviceSelector = (selector) =>
{
  return `@media screen and${selector.includes('..')
    ? parseRangeSelector(selector) : parseDeviceSelector(selector)
    }`;
}

/** @param {string} selector */
const parseRangeSelector = (selector) =>
{
  const range = selector.split(' ').slice(1).join(' ');
  const [fromDevice, toDevice] = range.split('..').map(device => device.trim());

  if (fromDevice && !(fromDevice in deviceRanges))
  {
    throw new Error(`Unknown device: ${fromDevice}`);
  }
  else if (toDevice && !(toDevice in deviceRanges))
  {
    throw new Error(`Unknown device: ${toDevice}`);
  }

  const breakpoints = [
    fromDevice && deviceRanges[fromDevice].lower ? `(min-width:${deviceRanges[fromDevice].lower})` : null,
    toDevice && deviceRanges[toDevice].upper ? `(max-width:${deviceRanges[toDevice].upper})` : null
  ];

  return breakpoints.filter(Boolean).join('and');
}

/** @param {string} selector */
const parseDeviceSelector = (selector) =>
{
  const [device] = selector.split(' ').slice(1);

  if (!(device in deviceRanges))
  {
    throw new Error(`Unknown device: ${device}`);
  }

  const breakpoints = [
    deviceRanges[device].lower ? `(min-width:${deviceRanges[device].lower})` : null,
    deviceRanges[device].upper ? `(max-width:${deviceRanges[device].upper})` : null
  ];

  return breakpoints.filter(Boolean).join('and');
}