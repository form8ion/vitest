// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {scaffold} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs({templates: {'canary-test.js': ''}});

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
