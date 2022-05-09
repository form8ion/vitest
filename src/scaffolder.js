export default function () {
  return {
    devDependencies: ['vitest'],
    scripts: {'test:unit:base': 'DEBUG=any vitest run'},
    testFilenamePattern: 'src/**/*.test.js'
  };
}
