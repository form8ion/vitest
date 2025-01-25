import path from 'path';
import {promises as fs} from 'node:fs';

import {assert, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as makeDir from '../thirdparty-wrappers/make-dir.js';
import scaffoldConfig from './config-scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('./config-scaffolder.js');

describe('scaffolder', () => {
  const projectRoot = any.string();
  const pathToCreatedSrcDirectory = any.string();

  beforeEach(() => {
    vi.spyOn(makeDir, 'default');
    when(makeDir.default).calledWith(`${projectRoot}/src`).mockResolvedValue(pathToCreatedSrcDirectory);
    vi.spyOn(fs, 'copyFile');
    fs.copyFile.mockImplementation(() => Promise.resolve());
  });

  it('that core details are defined', async () => {
    const dialect = any.word();
    const {dependencies, scripts, testFilenamePattern} = await scaffold({projectRoot, dialect});

    expect(fs.copyFile).toBeCalledWith(
      path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
      `${pathToCreatedSrcDirectory}/canary.test.js`
    );
    expect(scaffoldConfig).toBeCalledWith({projectRoot, dialect});

    assert.deepEqual(scripts, {'test:unit:base': 'DEBUG=any vitest run'});
    assert.deepEqual(dependencies.javascript.development, ['vitest', 'jest-when']);
    assert.equal(testFilenamePattern, 'src/**/*.test.js');
  });
});
