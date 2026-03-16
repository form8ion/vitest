export default function scaffoldCoverage() {
  return {
    dependencies: {javascript: {development: ['@vitest/coverage-v8']}},
    scripts: {'test:unit': "run-s 'test:unit:base -- --coverage'"},
    vcsIgnore: {directories: ['/coverage/']}
  };
}
