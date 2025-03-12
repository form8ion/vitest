import {promises as fs} from 'node:fs';

import any from '@travi/any';
import {describe, it, vi, expect} from 'vitest';

import removeCanary from './remover.js';

vi.mock('node:fs');

describe('canary remover', () => {
  it('should remove the canary test', async () => {
    const projectRoot = any.simpleObject();

    await removeCanary({projectRoot});

    expect(fs.unlink).toHaveBeenCalledWith(`${projectRoot}/src/canary.test.js`);
  });
});
