import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('built-in coverage should be enabled', async function () {
  const {dependencies} = this.result;

  assert.include(dependencies.javascript.development, '@vitest/coverage-v8');
});
