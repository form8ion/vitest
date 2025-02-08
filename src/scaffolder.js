import path from 'node:path';
import {promises as fs} from 'node:fs';
import filedirname from 'filedirname';

import scaffoldConfig from './config-scaffolder.js';

const [, __dirname] = filedirname();

export default async function ({projectRoot, dialect}) {
  await fs.mkdir(`${projectRoot}/src`, {recursive: true});

  await Promise.all([
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'canary-test.js'), `${projectRoot}/src/canary.test.js`),
    scaffoldConfig({projectRoot, dialect})
  ]);

  return {
    dependencies: {javascript: {development: ['vitest', 'jest-when']}},
    scripts: {'test:unit:base': 'DEBUG=any vitest run'},
    testFilenamePattern: 'src/**/*.test.js'
  };
}
