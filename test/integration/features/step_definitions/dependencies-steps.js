import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('dependencies are listed', async function () {
  const {dependencies, eslint} = this.result;

  assert.include(dependencies.javascript.development, 'vitest');
  assert.include(dependencies.javascript.development, 'vitest-when');
  assert.include(eslint.configs, 'vitest');
});

Then('jest-when is replaced with vitest-when', async function () {
  const {dependencies} = this.result;

  assert.include(dependencies.javascript.development, 'vitest-when');
  assert.include(dependencies.javascript.remove, 'jest-when');
});
