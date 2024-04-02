import {Given} from '@cucumber/cucumber';

Given('the project dialect is {string}', async function (dialect) {
  this.dialect = dialect;
});
