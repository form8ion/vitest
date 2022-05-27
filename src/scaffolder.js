import path from 'path';
import {promises as fs} from 'fs';

import makeDir from '../thirdparty-wrappers/make-dir';

export default async function ({projectRoot}) {
  const createdSrcDirectory = await makeDir(`${projectRoot}/src`);

  await fs.copyFile(
    path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
    `${createdSrcDirectory}/canary.test.js`
  );

  return {
    devDependencies: ['vitest', 'deep-equal'],
    scripts: {'test:unit:base': 'DEBUG=any vitest run'},
    testFilenamePattern: 'src/**/*.test.js'
  };
}
