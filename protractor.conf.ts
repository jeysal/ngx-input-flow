import { Config } from 'protractor';

const config: Config = {
  baseUrl: 'http://localhost:8080/',

  specs: ['e2e/**/*.spec.js'],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: process.env.CHROME_BINARY || '/usr/bin/google-chrome-stable',
      args: ['--headless', '--disable-gpu', '--window-size=800,600'],
    },
    shardTestFiles: true,
    maxInstances: 8,
  },
};

module.exports = { config };
