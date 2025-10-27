import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import {lift as liftCanary} from './canary/index.js';
import lift from './lifter.js';

vi.mock('./canary/index.js');

describe('lifter', () => {
  it('should replace `vitest-when` with `vitest-when`', async () => {
    const projectRoot = any.string();

    const {dependencies: {javascript: {development, remove}}} = await lift({projectRoot});

    expect(development).toEqual(['vitest-when']);
    expect(remove).toEqual(['jest-when']);
    expect(liftCanary).toHaveBeenCalledWith({projectRoot});
  });
});
