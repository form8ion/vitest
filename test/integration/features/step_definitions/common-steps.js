import {resolve} from 'path';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import {promises as fs} from 'fs';

const packagePreviewDirectory = '../__package_previews__/vitest';
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];
const pathToNodeModules = [...pathToProjectRoot, 'node_modules'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToNodeModules));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/vitest');

  stubbedFs({
    node_modules: stubbedNodeModules,
    [packagePreviewDirectory]: {
      '@form8ion': {
        vitest: {
          templates: {
            'canary-test.js': await fs.readFile(resolve(...pathToProjectRoot, 'templates', 'canary-test.js'))
          }
        }
      }
    }
  });

  this.result = await scaffold({projectRoot: process.cwd()});
});
