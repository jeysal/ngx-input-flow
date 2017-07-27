import { Config } from 'protractor';

const config: Config = require('./protractor.conf.js').config; // tslint:disable-line:no-var-requires no-require-imports

config.seleniumAddress = `http://${process.env.BROWSERSTACK_USER}:${process.env
  .BROWSERSTACK_KEY}@hub-cloud.browserstack.com/wd/hub`;
config.capabilities = {
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.local': true,
  'browserstack.debug': true,
  name: 'ngx-input-flow-e2e-edge',
  os: 'Windows',
  os_version: '10',
  browserName: 'Edge',
  browser_version: '15.0',
  resolution: '1024x768',
};

module.exports = { config };
