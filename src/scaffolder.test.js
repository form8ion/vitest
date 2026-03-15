import {promises as fs} from 'node:fs';

import {assert, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import scaffoldCanary from './canary/scaffolder.js';
import scaffoldConfig from './config-scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('node:fs');
vi.mock('./canary/scaffolder.js');
vi.mock('./config-scaffolder.js');

describe('scaffolder', () => {
  const projectRoot = any.string();

  it('that core details are defined', async () => {
    const dialect = any.word();

    const {dependencies, scripts, testFilenamePattern} = await scaffold({projectRoot, dialect});

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/src`, {recursive: true});
    expect(scaffoldCanary).toBeCalledWith({projectRoot});
    expect(scaffoldConfig).toBeCalledWith({projectRoot, dialect});

    assert.deepEqual(scripts, {'test:unit:base': 'DEBUG=any vitest run'});
    assert.deepEqual(dependencies.javascript.development, ['vitest', 'vitest-when']);
    assert.equal(testFilenamePattern, 'src/**/*.test.js');
  });
});
