import {directoryExists} from '@form8ion/core';

import {describe, vi, it, expect} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import test from './tester.js';

vi.mock('@form8ion/core');

describe('jetbrains predicate', () => {
  const projectRoot = any.string();

  it('should return `true` if the `.idea/` directory exists', async () => {
    when(directoryExists).calledWith(`${projectRoot}/.idea`).thenResolve(true);

    expect(await test({projectRoot})).toBe(true);
  });

  it('should return `false` if the `.idea/` directory does not exist', async () => {
    when(directoryExists).calledWith(`${projectRoot}/.idea`).thenResolve(false);

    expect(await test({projectRoot})).toBe(false);
  });
});
