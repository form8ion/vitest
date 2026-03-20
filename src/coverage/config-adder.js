export default function addCoverageConfig({test}) {
  // eslint-disable-next-line no-param-reassign
  test.coverage = {
    provider: 'v8',
    include: ['src/**'],
    exclude: ['src/**/index.js']
  };
}
