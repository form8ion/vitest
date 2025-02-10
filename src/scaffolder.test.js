import path from 'path';
import {promises as fs} from 'node:fs';

import {assert, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import scaffoldConfig from './config-scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('node:fs');
vi.mock('./config-scaffolder.js');

describe('scaffolder', () => {
  const projectRoot = any.string();

  beforeEach(() => {
    fs.copyFile.mockImplementation(() => Promise.resolve());
  });

  it('that core details are defined', async () => {
    const dialect = any.word();

    const {dependencies, scripts, testFilenamePattern} = await scaffold({projectRoot, dialect});

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/src`, {recursive: true});
    expect(fs.copyFile).toBeCalledWith(
      path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
      `${projectRoot}/src/canary.test.js`
    );
    expect(scaffoldConfig).toBeCalledWith({projectRoot, dialect});

    assert.deepEqual(scripts, {'test:unit:base': 'DEBUG=any vitest run'});
    assert.deepEqual(dependencies.javascript.development, ['vitest', 'jest-when']);
    assert.equal(testFilenamePattern, 'src/**/*.test.js');
  });
});
