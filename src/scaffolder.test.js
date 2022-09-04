import path from 'path';
import {promises as fs} from 'fs';

import {describe, it, assert, expect, vi, beforeEach, afterEach} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as makeDir from '../thirdparty-wrappers/make-dir';
import scaffold from './scaffolder';

describe('scaffolder', () => {
  const projectRoot = any.string();
  const pathToCreatedSrcDirectory = any.string();

  beforeEach(() => {
    vi.spyOn(makeDir, 'default');
    when(makeDir.default).calledWith(`${projectRoot}/src`).mockResolvedValue(pathToCreatedSrcDirectory);
    vi.spyOn(fs, 'copyFile');
    fs.copyFile.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('that core details are defined', async () => {
    const {devDependencies, scripts, testFilenamePattern} = await scaffold({projectRoot});

    expect(fs.copyFile).toBeCalledWith(
      path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
      `${pathToCreatedSrcDirectory}/canary.test.js`
    );

    assert.deepEqual(scripts, {'test:unit:base': 'DEBUG=any vitest run'});
    assert.deepEqual(devDependencies, ['vitest', 'jest-when']);
    assert.equal(testFilenamePattern, 'src/**/*.test.js');
  });
});
