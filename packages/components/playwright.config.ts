import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',
  outputDir: './visual-test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60000,
  reporter: [['html', { outputFolder: 'visual-test-report' }]],
  
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run storybook -- --no-open',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});