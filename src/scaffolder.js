import path from 'node:path';
import {promises as fs} from 'node:fs';
import filedirname from 'filedirname';
import makeDir from '../thirdparty-wrappers/make-dir';

const [, __dirname] = filedirname();

export default async function ({projectRoot}) {
  const createdSrcDirectory = await makeDir(`${projectRoot}/src`);

  await fs.copyFile(
    path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
    `${createdSrcDirectory}/canary.test.js`
  );

  return {
    devDependencies: ['vitest', 'jest-when'],
    scripts: {'test:unit:base': 'DEBUG=any vitest run'},
    testFilenamePattern: 'src/**/*.test.js'
  };
}
