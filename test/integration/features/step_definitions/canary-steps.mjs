import {fileExists} from '@form8ion/core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('a canary test file exists', async function () {
  assert.isTrue(await fileExists(`${process.cwd()}/src/canary.test.js`));
});
