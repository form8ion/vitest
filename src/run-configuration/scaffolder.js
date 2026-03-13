import {promises as fs} from 'node:fs';

export default async function scaffoldRunConfiguration({projectRoot}) {
  await fs.mkdir(`${projectRoot}/.idea/runConfigurations`, {recursive: true});

  await fs.writeFile(
    `${projectRoot}/.idea/runConfigurations/Unit_Tests.xml`,
    `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="Unit Tests" type="JavaScriptTestRunnerVitest">
    <node-interpreter value="project" />
    <vitest-package value="$PROJECT_DIR$/node_modules/vitest" />
    <working-dir value="$PROJECT_DIR$" />
    <vitest-options value="--run" />
    <envs />
    <scope-kind value="DIRECTORY" />
    <test-directory value="$PROJECT_DIR$/src" />
    <method v="2" />
  </configuration>
</component>`
  );
}
