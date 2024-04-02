// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {dialects} from '@form8ion/javascript-core';
import {scaffold} from './lib/index.mjs';

// remark-usage-ignore-next
stubbedFs({templates: {'canary-test.js': '', 'config.js': ''}});

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd(), dialect: dialects.ESM});
})();
