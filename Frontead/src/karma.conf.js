module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require("karma-coverage"),
      require('karma-remap-istanbul')      
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      //'../frontend/node_modules/jquery/dist/jquery.js',
      //'../node_modules/bootstrap/dist/js/bootstrap.min.js'
      //, { pattern: './src/test.ts', watched: false }
    ],
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    reporters:  ['progress', 'karma-remap-istanbul']
    ,


    angularCli: {
      config: './angular.json',
      environment: 'dev',
      codeCoverage: true

    },
    remapIstanbulReporter: {
      dir: 'test-results/coverage',
      reports: {
        html: 'coverage',
        lcovonly: './test-results/coverage/coverage.lcov'
      }
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },


    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    //captureTimeout: 180000,
    // browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    // browserNoActivityTimeout: 180000,
    // reportSlowerThan: 2000
    browserNoActivityTimeout: 100000
  });
};
