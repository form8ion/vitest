import {promises as fs} from 'node:fs';
import path from 'node:path';
import filedirname from 'filedirname';
import {dialects} from '@form8ion/javascript-core';

const [, __dirname] = filedirname();

export default async function ({projectRoot, dialect}) {
  await fs.copyFile(
    path.resolve(__dirname, '..', 'templates', 'config.js'),
    `${projectRoot}/vitest.config.${dialects.TYPESCRIPT === dialect ? 'ts' : 'js'}`
  );
}
