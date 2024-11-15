import { Config } from '@stencil/core';
import autoprefixer from 'autoprefixer';
import tailwind, {
  setPluginConfigurationDefaults,
  tailwindHMR
} from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';

import tailwindConf from './tailwind.config';

setPluginConfigurationDefaults({
  tailwindConf,
  tailwindCssPath: './src/global.css',
  postcss: {
    plugins: [tailwindcss(), autoprefixer()]
  }
});

export const config: Config = {
  namespace: 'lyndon-test',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'docs-vscode',
      file: 'dist/custom-elements.json'
    }
  ],
  testing: {
    browserHeadless: 'new'
  },
  globalStyle: 'src/global.css',
  plugins: [tailwind(), tailwindHMR()]
};
