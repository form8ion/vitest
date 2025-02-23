import {promises as fs} from 'node:fs';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('no vitest config file exists', async function () {
  return undefined;
});

Given('vitest is configured for the project', async function () {
  await fs.writeFile(`${this.projectRoot}/vitest.config.js`, any.string());
});

Then('vitest is configured using a {string} extension', async function (extension) {
  const vitestConfig = await fs.readFile(`${this.projectRoot}/vitest.config.${extension}`, 'utf-8');

  assert.equal(
    vitestConfig,
    `import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true
  }
});
`
  );
});
