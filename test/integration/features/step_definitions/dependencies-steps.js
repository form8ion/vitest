import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('dependencies are listed', async function () {
  const {dependencies} = this.result;

  assert.deepEqual(dependencies.javascript.development, ['vitest', 'jest-when']);
});
