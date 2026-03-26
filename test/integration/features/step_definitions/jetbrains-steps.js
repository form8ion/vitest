import {promises as fs} from 'node:fs';
import {directoryExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Given('a JetBrains editor is used to maintain the project', async function () {
  await fs.mkdir(`${this.projectRoot}/.idea`, {recursive: true});
});

Then('a JetBrains run-configuration is created for unit-testing with vitest', async function () {
  assert.deepEqual(
    await fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Unit_Tests.xml`, 'utf8'),
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

Then('a JetBrains run-configuration is not created for unit-testing with vitest', async function () {
  assert.isFalse(await directoryExists(`${this.projectRoot}/.idea`));
});
