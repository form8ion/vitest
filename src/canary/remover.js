import {promises as fs} from 'node:fs';

export default function removeCanary({projectRoot}) {
  return fs.unlink(`${projectRoot}/src/canary.test.js`);
}
