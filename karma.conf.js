const path = require('path')
process.env.CHROME_BIN = require('puppeteer').executablePath()

const browsers = ['FirefoxHeadless', 'ChromeHeadless']

module.exports = function (config) {
  config.set({
    files: [
      // only specify one entry point
      // and require all tests in there
      'browser-test.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'browser-test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map'
    },
    basePath: path.resolve(__dirname),
    frameworks: ['jasmine'],
    customLaunchers: {
      'FirefoxHeadless': {
        base: 'Firefox',
        flags: [
          '-headless'
        ]
      }
    },
    browsers
  })
}
