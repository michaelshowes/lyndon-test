/**
 * Turn a rem string like `4rem` into a px string like `64px`
 * @param {string} remVal
 */
export const extractPx = (remVal: string) => {
  const [num, unit] = remVal.split('rem');

  return unit === 'px' || unit === undefined ? remVal : `${parseFloat(num) * 16}px`;
};
