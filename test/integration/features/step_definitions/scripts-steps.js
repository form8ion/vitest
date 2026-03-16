import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('scripts are defined', async function () {
  const {scripts} = this.result;

  assert.equal(scripts['test:unit:base'], 'DEBUG=any vitest run');
});
