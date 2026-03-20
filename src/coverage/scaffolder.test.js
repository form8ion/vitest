import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import mutateConfig from '../config/mutator.js';
import addCoverageConfig from './config-adder.js';
import scaffoldCoverage from './scaffolder.js';

vi.mock('../config/mutator.js');

describe('coverage scaffolder', () => {
  it('should configure the build in coverage with the v8 provider', async () => {
    const projectRoot = any.string();

    expect(await scaffoldCoverage({projectRoot})).toEqual({
      dependencies: {javascript: {development: ['@vitest/coverage-v8']}},
      scripts: {
        'test:unit': "run-s 'test:unit:base -- --coverage'",
        'test:unit:base': 'NODE_ENV=test DEBUG=any vitest run src/'
      },
      vcsIgnore: {directories: ['/coverage/']},
      eslint: {ignore: {directories: ['/coverage/']}}
    });
    expect(mutateConfig).toHaveBeenCalledWith({projectRoot, mutator: addCoverageConfig});
  });
});
