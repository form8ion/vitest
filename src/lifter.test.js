import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCanary} from './canary/index.js';
import {test as jetbrainsIdeInUse, scaffold as scaffoldRunConfiguration} from './run-configuration/index.js';
import lift from './lifter.js';

vi.mock('./canary/index.js');
vi.mock('./run-configuration/index.js');

describe('lifter', () => {
  const projectRoot = any.string();

  it('should replace `vitest-when` with `vitest-when`', async () => {
    when(jetbrainsIdeInUse).calledWith(({projectRoot})).thenResolve(false);

    const {dependencies: {javascript: {development, remove}}} = await lift({projectRoot});

    expect(development).toEqual(['vitest-when']);
    expect(remove).toEqual(['jest-when']);
    expect(liftCanary).toHaveBeenCalledWith({projectRoot});
    expect(scaffoldRunConfiguration).not.toHaveBeenCalled();
  });

  it('should scaffold the jetbrains run-configuration if a jetbrains ide is in use', async () => {
    when(jetbrainsIdeInUse).calledWith({projectRoot}).thenResolve(true);

    await lift({projectRoot});

    expect(scaffoldRunConfiguration).toHaveBeenCalledWith({projectRoot});
  });
});
