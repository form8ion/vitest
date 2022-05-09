import {describe, it, assert} from 'vitest';

import scaffold from './scaffolder';

describe('scaffolder', () => {
  it('that core details are defined', async () => {
    const {devDependencies, scripts, testFilenamePattern} = await scaffold();

    assert.deepEqual(scripts, {'test:unit:base': 'DEBUG=any vitest run'});
    assert.deepEqual(devDependencies, ['vitest']);
    assert.equal(testFilenamePattern, 'src/**/*.test.js');
  });
});
