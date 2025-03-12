import {glob} from 'tinyglobby';

import {describe, it, vi, expect} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import removeCanary from './remover.js';
import canaryExists from './tester.js';
import liftCanary from './lifter.js';

vi.mock('./remover.js');
vi.mock('./tester.js');
vi.mock('tinyglobby');

describe('canary lifter', () => {
  const projectRoot = any.string();

  it('should remove the canary test when other tests exist', async () => {
    when(glob)
      .calledWith(['src/**/*.test.js', '!src/canary.test.js'], {cwd: projectRoot})
      .mockResolvedValue(['other-test.js']);
    when(canaryExists).calledWith({projectRoot}).mockResolvedValue(true);

    await liftCanary({projectRoot});

    expect(removeCanary).toHaveBeenCalledWith({projectRoot});
  });

  it(
    'should not attempt to remove the canary file when other test files exist, but the canary is already removed',
    async () => {
      when(canaryExists).calledWith({projectRoot}).mockResolvedValue(false);

      await liftCanary({projectRoot});

      expect(removeCanary).not.toHaveBeenCalledWith({projectRoot});
    }
  );

  it('should not attempt to remove the canary file when other tests do not exist', async () => {
    when(glob)
      .calledWith(['src/**/*.test.js', '!src/canary.test.js'], {cwd: projectRoot})
      .mockResolvedValue([]);
    when(canaryExists).calledWith({projectRoot}).mockResolvedValue(true);

    await liftCanary({projectRoot});

    expect(removeCanary).not.toHaveBeenCalledWith({projectRoot});
  });
});
