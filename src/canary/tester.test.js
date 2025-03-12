import {fileExists} from '@form8ion/core';

import {describe, it, vi, expect} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import canaryExists from './tester.js';

vi.mock('@form8ion/core');

describe('canary predicate', () => {
  const projectRoot = any.string();

  it('should return `true` when the canary test exists', async () => {
    when(fileExists).calledWith(`${projectRoot}/src/canary.test.js`).mockResolvedValue(true);

    expect(await canaryExists({projectRoot})).toBe(true);
  });

  it('should return `false` when the canary test does not exist', async () => {
    when(fileExists).calledWith(`${projectRoot}/src/canary.test.js`).mockResolvedValue(false);

    expect(await canaryExists({projectRoot})).toBe(false);
  });
});
