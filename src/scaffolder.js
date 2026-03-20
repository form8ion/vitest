import {promises as fs} from 'node:fs';

import {scaffold as scaffoldCanary} from './canary/index.js';
import {scaffold as scaffoldConfig} from './config/index.js';

export default async function scaffoldVitest({projectRoot, dialect}) {
  await fs.mkdir(`${projectRoot}/src`, {recursive: true});

  await Promise.all([
    scaffoldCanary({projectRoot}),
    scaffoldConfig({projectRoot, dialect})
  ]);

  return {
    dependencies: {javascript: {development: ['vitest', 'vitest-when']}},
    scripts: {'test:unit:base': 'NODE_ENV=test DEBUG=any vitest run src/'},
    testFilenamePattern: 'src/**/*.test.js',
    eslint: {configs: ['vitest']}
  };
}
