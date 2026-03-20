import {fileExists} from '@form8ion/core';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import determineConfigFilePath from './finder.js';

vi.mock('@form8ion/core');

describe('config file finder', () => {
  const projectRoot = any.string();

  it('should return the path to the javascript config, if it exists', async () => {
    when(fileExists).calledWith(`${projectRoot}/vitest.config.js`).thenResolve(true);

    expect(await determineConfigFilePath({projectRoot})).toEqual(`${projectRoot}/vitest.config.js`);
  });

  it('should return the path to the typescript config, if it exists', async () => {
    when(fileExists).calledWith(`${projectRoot}/vitest.config.js`).thenResolve(false);
    when(fileExists).calledWith(`${projectRoot}/vitest.config.ts`).thenResolve(true);

    expect(await determineConfigFilePath({projectRoot})).toEqual(`${projectRoot}/vitest.config.ts`);
  });

  it('should throw an error if no config is found', async () => {
    when(fileExists).calledWith(`${projectRoot}/vitest.config.js`).thenResolve(false);
    when(fileExists).calledWith(`${projectRoot}/vitest.config.ts`).thenResolve(false);

    await expect(determineConfigFilePath({projectRoot})).rejects.toThrow('Unable to find a vitest config file');
  });
});
