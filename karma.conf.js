
const path = require('path')
const IS_CI = 'TRAVIS' in process.env && 'CI' in process.env
process.env.CHROME_BIN = require('puppeteer').executablePath()

const browsers = ['Firefox']
if (!IS_CI) {
  browsers.push('Chrome')
} else {
  browsers.push('ChromeHeadless')
}

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
    browsers
  })
}
