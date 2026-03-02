import {lift as liftCanary} from './canary/index.js';
import {test as jetbrainsIdeInUse, scaffold as scaffoldRunConfiguration} from './run-configuration/index.js';

export default async function lift({projectRoot}) {
  await liftCanary({projectRoot});

  if (await jetbrainsIdeInUse({projectRoot})) {
    await scaffoldRunConfiguration({projectRoot});
  }

  return {dependencies: {javascript: {development: ['vitest-when'], remove: ['jest-when']}}};
}
