import mutateConfig from '../config/mutator.js';
import addCoverageConfig from './config-adder.js';

export default async function scaffoldCoverage({projectRoot}) {
  await mutateConfig({projectRoot, mutator: addCoverageConfig});

  return {
    dependencies: {javascript: {development: ['@vitest/coverage-v8']}},
    scripts: {'test:unit': "run-s 'test:unit:base -- --coverage'"},
    vcsIgnore: {directories: ['/coverage/']},
    eslint: {ignore: {directories: ['/coverage/']}}
  };
}
