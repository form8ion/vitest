import {fileExists} from '@form8ion/core';

export default async function vitestInUse({projectRoot}) {
  const [jsConfigIsPresent, tsConfigIsPresent] = await Promise.all([
    fileExists(`${projectRoot}/vitest.config.js`),
    fileExists(`${projectRoot}/vitest.config.ts`)
  ]);

  return jsConfigIsPresent || tsConfigIsPresent;
}
