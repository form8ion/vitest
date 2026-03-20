import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import addCoverageConfig from './config-adder.js';

describe('coverage config adder', () => {
  it('should mutate the `test` property of the ast to include coverage details', async () => {
    const optionsAst = {...any.simpleObject(), test: any.simpleObject()};

    addCoverageConfig(optionsAst);

    expect(optionsAst.test.coverage).toEqual({
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/**/index.js']
    });
  });
});
