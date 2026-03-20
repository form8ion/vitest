import {promises as fs} from 'node:fs';

import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import scaffoldCanary from './canary/scaffolder.js';
import {scaffold as scaffoldConfig} from './config/index.js';
import scaffold from './scaffolder.js';

vi.mock('node:fs');
vi.mock('./canary/scaffolder.js');
vi.mock('./config/index.js');

describe('scaffolder', () => {
  const projectRoot = any.string();

  it('that core details are defined', async () => {
    const dialect = any.word();

    expect(await scaffold({projectRoot, dialect})).toEqual({
      dependencies: {javascript: {development: ['vitest', 'vitest-when']}},
      scripts: {'test:unit:base': 'NODE_ENV=test DEBUG=any vitest run src/'},
      testFilenamePattern: 'src/**/*.test.js',
      eslint: {configs: ['vitest']}
    });

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/src`, {recursive: true});
    expect(scaffoldCanary).toHaveBeenCalledWith({projectRoot});
    expect(scaffoldConfig).toHaveBeenCalledWith({projectRoot, dialect});
  });
});
