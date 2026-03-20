import {promises as fs} from 'node:fs';
import {loadFile} from 'magicast';
import {getDefaultExportOptions} from 'magicast/helpers';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('c8 is currently configured to collect coverage', async function () {
  await fs.writeFile(`${this.projectRoot}/.c8rc.json`, JSON.stringify(any.simpleObject()));
});

Then('built-in coverage should be enabled', async function () {
  const vitestConfig = await loadFile(`${this.projectRoot}/vitest.config.js`);
  const {test: {coverage}} = getDefaultExportOptions(vitestConfig);
  const {dependencies, scripts, vcsIgnore, eslint} = this.result;

  assert.include(dependencies.javascript.development, '@vitest/coverage-v8');
  assert.equal(scripts['test:unit'], "run-s 'test:unit:base -- --coverage'");
  assert.equal(scripts['test:unit:base'], 'NODE_ENV=test DEBUG=any vitest run src/');
  assert.include(vcsIgnore.directories, '/coverage/');
  assert.include(eslint.ignore.directories, '/coverage/');

  assert.equal(coverage.provider, 'v8');
  assert.deepEqual(coverage.include, ['src/**']);
  assert.deepEqual(coverage.exclude, ['src/**/index.js']);
});

Then('c8 should be removed', async function () {
  const {dependencies} = this.result;

  assert.include(dependencies.javascript.remove, 'c8');
  assert.isFalse(await fileExists(`${this.projectRoot}/.c8rc.json`));
});
