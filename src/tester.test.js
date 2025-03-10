import {fileExists} from '@form8ion/core';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import vitestIsPresent from './tester.js';

vi.mock('@form8ion/core');

describe('predicate', () => {
  const projectRoot = any.string();

  it('should return `false` if no config file is found', async () => {
    fileExists.mockResolvedValue(false);

    expect(await vitestIsPresent({projectRoot})).toBe(false);
  });

  it('should return `true` if a JavaScript formatted config file is found', async () => {
    when(fileExists).calledWith(`${projectRoot}/vitest.config.js`).mockResolvedValue(true);

    expect(await vitestIsPresent({projectRoot})).toBe(true);
  });

  it('should return `true` if a TypeScript formatted config file is found', async () => {
    when(fileExists).calledWith(`${projectRoot}/vitest.config.js`).mockResolvedValue(false);
    when(fileExists).calledWith(`${projectRoot}/vitest.config.ts`).mockResolvedValue(true);

    expect(await vitestIsPresent({projectRoot})).toBe(true);
  });
});
