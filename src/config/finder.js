import {fileExists} from '@form8ion/core';

export default async function determineConfigFilePath({projectRoot}) {
  if (await fileExists(`${projectRoot}/vitest.config.js`)) return `${projectRoot}/vitest.config.js`;
  if (await fileExists(`${projectRoot}/vitest.config.ts`)) return `${projectRoot}/vitest.config.ts`;

  throw new Error('Unable to find a vitest config file');
}
