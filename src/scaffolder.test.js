import {promises as fs} from 'node:fs';
import deepmerge from 'deepmerge';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {scaffold as scaffoldCoverage} from './coverage/index.js';
import scaffoldCanary from './canary/scaffolder.js';
import scaffoldConfig from './config-scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('node:fs');
vi.mock('deepmerge');
vi.mock('./coverage/scaffolder.js');
vi.mock('./canary/scaffolder.js');
vi.mock('./config-scaffolder.js');

describe('scaffolder', () => {
  const projectRoot = any.string();

  it('that core details are defined', async () => {
    const dialect = any.word();
    const coverageResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(scaffoldCoverage).calledWith().thenResolve(coverageResults);
    when(deepmerge)
      .calledWith(
        {
          dependencies: {javascript: {development: ['vitest', 'vitest-when']}},
          scripts: {'test:unit:base': 'DEBUG=any vitest run'},
          testFilenamePattern: 'src/**/*.test.js'
        },
        coverageResults
      )
      .thenReturn(mergedResults);

    expect(await scaffold({projectRoot, dialect})).toEqual(mergedResults);

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/src`, {recursive: true});
    expect(scaffoldCanary).toBeCalledWith({projectRoot});
    expect(scaffoldConfig).toBeCalledWith({projectRoot, dialect});
  });
});
