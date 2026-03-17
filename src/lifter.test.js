import deepmerge from 'deepmerge';

import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCoverage} from './coverage/index.js';
import {lift as liftCanary} from './canary/index.js';
import {test as jetbrainsIdeInUse, scaffold as scaffoldRunConfiguration} from './run-configuration/index.js';
import lift from './lifter.js';

vi.mock('deepmerge');
vi.mock('./coverage/index.js');
vi.mock('./canary/index.js');
vi.mock('./run-configuration/index.js');

describe('lifter', () => {
  const projectRoot = any.string();

  it('should replace `vitest-when` with `vitest-when` and configure coverage', async () => {
    const coverageResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(liftCoverage).calledWith({projectRoot}).thenResolve(coverageResults);
    when(deepmerge)
      .calledWith({dependencies: {javascript: {development: ['vitest-when'], remove: ['jest-when']}}}, coverageResults)
      .thenReturn(mergedResults);
    when(jetbrainsIdeInUse).calledWith(({projectRoot})).thenResolve(false);

    expect(await lift({projectRoot})).toEqual(mergedResults);

    expect(liftCanary).toHaveBeenCalledWith({projectRoot});
    expect(scaffoldRunConfiguration).not.toHaveBeenCalled();
  });

  it('should scaffold the jetbrains run-configuration if a jetbrains ide is in use', async () => {
    when(jetbrainsIdeInUse).calledWith({projectRoot}).thenResolve(true);

    await lift({projectRoot});

    expect(scaffoldRunConfiguration).toHaveBeenCalledWith({projectRoot});
  });
});
