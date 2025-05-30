import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',
  outputDir: './visual-test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 4 : 8,
  timeout: 30000,
  reporter: [['html', { outputFolder: 'visual-test-report' }]],
  
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    navigationTimeout: 15000,
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