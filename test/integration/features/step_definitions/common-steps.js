import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, Before, Then, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import {assert} from 'chai';

const __dirname = dirname(fileURLToPath(import.meta.url));        // eslint-disable-line no-underscore-dangle
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToProjectRoot, 'node_modules'));
const stubbedTemplates = stubbedFs.load(resolve(...pathToProjectRoot, 'templates'));

Before(function () {
  this.projectRoot = process.cwd();

  stubbedFs({
    node_modules: stubbedNodeModules,
    templates: stubbedTemplates
  });
});

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = await import('@form8ion/vitest');

  this.result = await scaffold({projectRoot: this.projectRoot, dialect: this.dialect});
});

When('checking for presence of vitest', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {test} = await import('@form8ion/vitest');

  this.vitestDetected = await test({projectRoot: this.projectRoot});
});

When('the project is lifted', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {test, lift} = await import('@form8ion/vitest');

  if (await test({projectRoot: this.projectRoot})) {
    this.result = await lift({projectRoot: this.projectRoot});
  }
});

Then('the vitest usage is not detected', async function () {
  assert.isFalse(this.vitestDetected);
});
