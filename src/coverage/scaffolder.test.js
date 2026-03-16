import {describe, it, expect} from 'vitest';

import scaffoldCoverage from './scaffolder.js';

describe('coverage scaffolder', () => {
  it('should configure the build in coverage with the v8 provider', async () => {
    expect(await scaffoldCoverage()).toEqual({
      dependencies: {javascript: {development: ['@vitest/coverage-v8']}},
      scripts: {'test:unit': "run-s 'test:unit:base -- --coverage'"},
      vcsIgnore: {directories: ['/coverage/']},
      eslint: {ignore: {directories: ['/coverage/']}}
    });
  });
});
