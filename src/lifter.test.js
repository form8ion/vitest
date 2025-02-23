import {describe, it, expect} from 'vitest';

import lift from './lifter.js';

describe('lifter', () => {
  it('should replace `jest-when` with `vitest-when`', async () => {
    const {dependencies: {javascript: {development, remove}}} = await lift({});

    expect(development).toEqual(['vitest-when']);
    expect(remove).toEqual(['jest-when']);
  });
});
