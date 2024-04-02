import {promises as fs} from 'node:fs';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('vitest is configured using a {string} extension', async function (extension) {
  const vitestConfig = await fs.readFile(`${process.cwd()}/vitest.config.${extension}`, 'utf-8');

  assert.equal(
    vitestConfig,
    `import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true
  }
});
`
  );
});
