import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToProjectRoot, 'node_modules'));
const stubbedTemplates = stubbedFs.load(resolve(...pathToProjectRoot, 'templates'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = await import('@form8ion/vitest');

  stubbedFs({
    node_modules: stubbedNodeModules,
    templates: stubbedTemplates
  });

  this.result = await scaffold({projectRoot: process.cwd()});
});
