// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {dialects} from '@form8ion/javascript-core';
import {scaffold, test, lift} from './lib/index.js';

// remark-usage-ignore-next 9
stubbedFs({
  templates: {
    'canary-test.js': '',
    'config.js': `import {defineConfig} from 'vitest/config';

export default defineConfig({test: {}});
`
  }
});

// #### Execute

(async () => {
  const projectRoot = process.cwd();

  await scaffold({projectRoot, dialect: dialects.ESM});

  if (await test({projectRoot})) {
    await lift({projectRoot});
  }
})();
