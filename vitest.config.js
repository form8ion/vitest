import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    mockReset: true,
    reporters: process.env.CI
      ? ['default', ['junit', {outputFile: 'test-report.junit.xml'}]]
      : ['default'],
    coverage: {
      provider: 'v8',
      include: ['src/**']
    }
  }
});
