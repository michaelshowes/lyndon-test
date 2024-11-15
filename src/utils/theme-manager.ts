// eslint-disable-next-line @typescript-eslint/no-var-requires
const distConfig = require('../../dist.config.json');

/**
 * Get theme name.
 */
const getTheme = enabledThemes => {
  if (process.env.THEME && distConfig.enabledThemes.includes(process.env.THEME)) {
    return process.env.THEME;
  }
  return enabledThemes ? distConfig.enabledThemes : distConfig.defaultTheme;
};

module.exports = { getTheme };
