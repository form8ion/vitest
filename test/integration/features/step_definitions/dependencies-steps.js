import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('dependencies are listed', async function () {
  const {dependencies} = this.result;

  assert.deepEqual(dependencies.javascript.development, ['vitest', 'vitest-when']);
});

Then('jest-when is replaced with vitest-when', async function () {
  const {dependencies} = this.result;

  assert.deepEqual(dependencies.javascript.development, ['vitest-when']);
  assert.deepEqual(dependencies.javascript.remove, ['jest-when']);
});
