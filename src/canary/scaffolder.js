import path from 'node:path';
import {promises as fs} from 'node:fs';
import filedirname from 'filedirname';

const [, __dirname] = filedirname(import.meta.url);

export default function scaffoldCanary({projectRoot}) {
  return fs.copyFile(
    path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
    `${projectRoot}/src/canary.test.js`
  );
}
