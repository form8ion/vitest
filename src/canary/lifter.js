import {glob} from 'tinyglobby';

import canaryExists from './tester.js';
import remove from './remover.js';

async function otherTestFilesExist(projectRoot) {
  const otherTestFiles = await glob(['src/**/*.test.js', '!src/canary.test.js'], {cwd: projectRoot});

  return 0 < otherTestFiles.length;
}

export default async function liftCanary({projectRoot}) {
  if (await canaryExists({projectRoot}) && await otherTestFilesExist(projectRoot)) {
    await remove({projectRoot});
  }
}
