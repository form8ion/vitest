import {loadFile, writeFile} from 'magicast';
import {getDefaultExportOptions} from 'magicast/helpers';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import determineConfigFilePath from './finder.js';
import mutateConfig from './mutator.js';

vi.mock('magicast');
vi.mock('magicast/helpers');
vi.mock('./finder.js');

describe('config mutator', () => {
  const projectRoot = any.string();

  it('should modify the file by providing the AST to the modifier function', async () => {
    const vitestConfig = any.simpleObject();
    const optionsAst = any.simpleObject();
    const mutator = vi.fn();
    const pathToConfig = any.string();
    when(determineConfigFilePath).calledWith({projectRoot}).thenResolve(pathToConfig);
    when(loadFile).calledWith(pathToConfig).thenResolve(vitestConfig);
    when(getDefaultExportOptions).calledWith(vitestConfig).thenReturn(optionsAst);

    await mutateConfig({projectRoot, mutator});

    expect(mutator).toHaveBeenCalledWith(optionsAst);
    expect(writeFile).toHaveBeenCalledWith(vitestConfig, pathToConfig);
  });
});
