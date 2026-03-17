import deepmerge from 'deepmerge';
import {remove as removeC8} from '@form8ion/c8';

import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import scaffoldCoverage from './scaffolder.js';
import liftCoverage from './lifter.js';

vi.mock('deepmerge');
vi.mock('@form8ion/c8');
vi.mock('./scaffolder.js');

describe('lift coverage', () => {
  it('should switch from c8 to built-in coverage collection', async () => {
    const projectRoot = any.string();
    const scaffoldResults = any.simpleObject();
    const c8RemovalResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(scaffoldCoverage).calledWith().thenResolve(scaffoldResults);
    when(removeC8).calledWith({projectRoot}).thenResolve(c8RemovalResults);
    when(deepmerge).calledWith(scaffoldResults, c8RemovalResults).thenReturn(mergedResults);

    expect(await liftCoverage({projectRoot})).toEqual(mergedResults);
  });
});
