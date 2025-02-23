// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {dialects} from '@form8ion/javascript-core';
import {scaffold, test, lift} from './lib/index.mjs';

// remark-usage-ignore-next
stubbedFs({templates: {'canary-test.js': '', 'config.js': ''}});

// #### Execute

(async () => {
  const projectRoot = process.cwd();

  await scaffold({projectRoot, dialect: dialects.ESM});

  if (await test({projectRoot})) {
    await lift({projectRoot});
  }
})();
