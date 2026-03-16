import deepmerge from 'deepmerge';

import {scaffold as scaffoldCoverage} from './coverage/index.js';
import {lift as liftCanary} from './canary/index.js';
import {test as jetbrainsIdeInUse, scaffold as scaffoldRunConfiguration} from './run-configuration/index.js';

export default async function lift({projectRoot}) {
  const [coverageResults] = await Promise.all([scaffoldCoverage(), liftCanary({projectRoot})]);

  if (await jetbrainsIdeInUse({projectRoot})) {
    await scaffoldRunConfiguration({projectRoot});
  }

  return deepmerge(
    {dependencies: {javascript: {development: ['vitest-when'], remove: ['jest-when']}}},
    coverageResults
  );
}
