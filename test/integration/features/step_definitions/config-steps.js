import {promises as fs} from 'node:fs';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import {loadFile} from 'magicast';
import {getDefaultExportOptions} from 'magicast/helpers';

Given('no vitest config file exists', async function () {
  return undefined;
});

Given('vitest is configured for the project', async function () {
  await fs.writeFile(`${this.projectRoot}/vitest.config.js`, `import {defineConfig} from 'vitest/config';

export default defineConfig({test: {restoreMocks: true}});
`);
});

Then('vitest is configured using a {string} extension', async function (extension) {
  const vitestConfig = await loadFile(`${this.projectRoot}/vitest.config.${extension}`);
  const {test: {restoreMocks, mockReset, resetEnv}} = getDefaultExportOptions(vitestConfig);

  assert.isTrue(restoreMocks);
  assert.isTrue(mockReset);
  assert.isTrue(resetEnv);
});
