import {lift as liftCanary} from './canary/index.js';

export default async function ({projectRoot}) {
  await liftCanary({projectRoot});

  return {dependencies: {javascript: {development: ['vitest-when'], remove: ['jest-when']}}};
}
