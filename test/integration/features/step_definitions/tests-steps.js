import {promises as fs} from 'node:fs';

import {Given} from '@cucumber/cucumber';
import any from '@travi/any';

Given('other vitest tests exist', async function () {
  await fs.mkdir(`${this.projectRoot}/src`, {recursive: true});
  await Promise.all([
    fs.writeFile(`${this.projectRoot}/src/foo.test.js`, any.string()),
    fs.writeFile(`${this.projectRoot}/src/bar.test.js`, any.string())
  ]);
});
