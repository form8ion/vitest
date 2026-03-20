import {loadFile, writeFile} from 'magicast';
import {getDefaultExportOptions} from 'magicast/helpers';

import determineConfigFilePath from './finder.js';

export default async function mutateConfig({projectRoot, mutator}) {
  const pathToConfig = await determineConfigFilePath({projectRoot});

  const vitestConfig = await loadFile(pathToConfig);
  const optionsAst = getDefaultExportOptions(vitestConfig);

  mutator(optionsAst);

  await writeFile(vitestConfig, pathToConfig);
}
