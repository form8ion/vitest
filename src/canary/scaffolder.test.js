import path from 'node:path';
import {promises as fs} from 'node:fs';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import scaffoldCanary from './scaffolder.js';

vi.mock('node:fs');

describe('canary scaffolder', () => {
  it('should copy the canary test template into the project', async () => {
    const projectRoot = any.string();

    await scaffoldCanary({projectRoot});

    expect(fs.copyFile).toHaveBeenCalledWith(
      path.resolve(__dirname, '..', 'templates', 'canary-test.js'),
      `${projectRoot}/src/canary.test.js`
    );
  });
});
