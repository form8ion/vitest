import {promises as fs} from 'node:fs';
import path from 'node:path';
import {dialects} from '@form8ion/javascript-core';

import any from '@travi/any';
import {describe, vi, expect, it} from 'vitest';

import scaffoldConfig from './config-scaffolder.js';

vi.mock('node:fs');

describe('config scaffolder', () => {
  const projectRoot = any.string();

  it('should create the config file for a typescript project', async () => {
    await scaffoldConfig({projectRoot, dialect: dialects.TYPESCRIPT});

    expect(fs.copyFile).toBeCalledWith(
      path.resolve(__dirname, '..', 'templates', 'config.js'),
      `${projectRoot}/vitest.config.ts`
    );
  });

  it('should create the config file for an ESM project', async () => {
    await scaffoldConfig({projectRoot, dialect: dialects.ESM});

    expect(fs.copyFile).toBeCalledWith(
      path.resolve(__dirname, '..', 'templates', 'config.js'),
      `${projectRoot}/vitest.config.js`
    );
  });
});
