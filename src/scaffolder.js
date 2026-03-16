import {promises as fs} from 'node:fs';
import deepmerge from 'deepmerge';

import {scaffold as scaffoldCoverage} from './coverage/index.js';
import {scaffold as scaffoldCanary} from './canary/index.js';
import scaffoldConfig from './config-scaffolder.js';

export default async function scaffoldVitest({projectRoot, dialect}) {
  await fs.mkdir(`${projectRoot}/src`, {recursive: true});

  const [coverageResults] = await Promise.all([
    scaffoldCoverage(),
    scaffoldCanary({projectRoot}),
    scaffoldConfig({projectRoot, dialect})
  ]);

  return deepmerge(
    {
      dependencies: {javascript: {development: ['vitest', 'vitest-when']}},
      scripts: {'test:unit:base': 'DEBUG=any vitest run'},
      testFilenamePattern: 'src/**/*.test.js'
    },
    coverageResults
  );
}
