export default function addCoverageConfig({test}) {
  // eslint-disable-next-line no-param-reassign
  test.coverage = {
    provider: 'v8',
    reporter: ['lcov', 'text-summary', 'html'],
    include: ['src/**'],
    exclude: ['src/**/index.js']
  };
}
