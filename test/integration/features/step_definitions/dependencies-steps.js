import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('dependencies are listed', async function () {
  const {devDependencies} = this.result;

  assert.deepEqual(devDependencies, ['vitest', 'deep-equal']);
});
