import path from 'node:path';
import {promises as fs} from 'node:fs';
import filedirname from 'filedirname';

import makeDir from '../thirdparty-wrappers/make-dir.js';
import scaffoldConfig from './config-scaffolder.js';

const [, __dirname] = filedirname();

export default async function ({projectRoot, dialect}) {
  const createdSrcDirectory = await makeDir(`${projectRoot}/src`);

  await Promise.all([
    fs.copyFile(path.resolve(__dirname, '..', 'templates', 'canary-test.js'), `${createdSrcDirectory}/canary.test.js`),
    scaffoldConfig({projectRoot, dialect})
  ]);

  return {
    devDependencies: ['vitest', 'jest-when'],
    scripts: {'test:unit:base': 'DEBUG=any vitest run'},
    testFilenamePattern: 'src/**/*.test.js'
  };
}
