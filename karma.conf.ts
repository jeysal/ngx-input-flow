import { Config, ConfigOptions } from 'karma';

const options: ConfigOptions = {
  browsers: ['ChromeHeadless'],
  singleRun: true,

  frameworks: ['mocha', 'chai', 'karma-typescript'],
  reporters: ['mocha', 'karma-typescript', 'progress'],

  files: [
    'node_modules/reflect-metadata/Reflect.js',

    { pattern: 'src/**/*.ts' },
  ],
  preprocessors: {
    '**/*.ts': ['karma-typescript'],
  },
};

const tsConfig = {
  reports: {
    html: { directory: 'coverage/karma' },
    lcovonly: {
      directory: 'coverage/karma',
      filename: 'lcov.info',
    },
    json: {
      directory: 'coverage/karma',
      filename: 'coverage.json',
    },
    text: '',
  },
  tsconfig: './tsconfig.json',
};
(options as any).karmaTypescriptConfig = tsConfig;

module.exports = (config: Config) => {
  config.set(options);
};
