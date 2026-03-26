import {promises as fs} from 'node:fs';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import scaffoldRunConfiguration from './scaffolder.js';

vi.mock('node:fs');

describe('run-configuration scaffolder', () => {
  const projectRoot = any.string();

  it('should create a run-configuration for unit-testing with vitest', async () => {
    await scaffoldRunConfiguration({projectRoot});

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/.idea/runConfigurations`, {recursive: true});
    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/.idea/runConfigurations/Unit_Tests.xml`,
      `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="Unit Tests" type="JavaScriptTestRunnerVitest">
    <node-interpreter value="project" />
    <vitest-package value="$PROJECT_DIR$/node_modules/vitest" />
    <working-dir value="$PROJECT_DIR$" />
    <vitest-options value="--run" />
    <envs>
      <env name="NODE_ENV" value="test" />
    </envs>
    <scope-kind value="DIRECTORY" />
    <test-directory value="$PROJECT_DIR$/src" />
    <method v="2" />
  </configuration>
</component>`
    );
  });
});
