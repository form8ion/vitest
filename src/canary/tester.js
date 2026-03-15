import {fileExists} from '@form8ion/core';

export default function canaryTestFileExists({projectRoot}) {
  return fileExists(`${projectRoot}/src/canary.test.js`);
}
