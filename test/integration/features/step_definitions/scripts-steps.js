import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('scripts are defined', async function () {
  const {scripts} = this.result;

  assert.equal(scripts['test:unit:base'], 'NODE_ENV=test DEBUG=any vitest run src/');
});
