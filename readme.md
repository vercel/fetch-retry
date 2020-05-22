# fetch-retry [![CircleCI](https://circleci.com/gh/zeit/fetch-retry.svg?style=svg)](https://circleci.com/gh/zeit/fetch-retry)

Original Credit: [zeit/fetch-retry](https://github.com/zeit/fetch-retry)
A layer on top of `fetch` with sensible defaults for retrying to prevent common errors.

[![Build Status](https://travis-ci.org/geoffdutton/fetch-retry.svg?branch=master)](https://travis-ci.org/geoffdutton/fetch-retry)
[![Coverage Status](https://coveralls.io/repos/github/geoffdutton/fetch-retry/badge.svg?branch=master)](https://coveralls.io/github/geoffdutton/fetch-retry?branch=master)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.comr)
![](https://img.shields.io/david/geoffdutton/fetch-retry.svg?style=flat)
[![Known Vulnerabilities](https://snyk.io/test/github/geoffdutton/fetch-retry/badge.svg)](https://snyk.io/test/github/geoffdutton/fetch-retry)


## How to use

`fetch-retry` is a drop-in replacement for `fetch`:

```js
const fetch = require('@geoffdutton/fetch-retry')(require('node-fetch'))

module.exports = async () => {
  const res = await fetch('http://localhost:3000')
  console.log(res.status);
}
```

```js
// in the browser
const fetch = require('@geoffdutton/fetch-retry')(window.fetch)

module.exports = async () => {
  const res = await fetch('http://localhost:3000')
  console.log(res.status);
}
```

Make sure to `yarn add @geoffdutton/fetch-retry` in your main package.

Note that you can pass [retry options](https://github.com/zeit/async-retry) to using `opts.retry`.
We also provide a `opts.onRetry` and `opts.retry.maxRetryAfter` options.

`opts.onRetry` is a customized version of `opts.retry.onRetry` and passes
not only the `error` object in each retry but also the current `opts` object.

`opts.retry.maxRetryAfter` is the max wait time according to the `Retry-After` header.
If it exceeds the option value, stop retrying and returns the error response. It defaults to `20`.

## Rationale

Some errors are very common in production (like the underlying `Socket`
yielding `ECONNRESET`), and can easily and instantly be remediated
by retrying.

The default behavior of `fetch-retry` is to attempt retries **10**, **60**
**360**, **2160** and **12960** milliseconds (a total of 5 retries) after
a *network error*, *429* or *5xx* error occur.

The idea is to provide a sensible default: most applications should
continue to perform correctly with a worst case scenario of a given
request having an additional 15550ms overhead.

On the other hand, most applications that use `fetch-retry` instead of
vanilla `fetch` should see lower rates of common errors and fewer 'glitches'
in production.

## Tests

To run rests, execute

```console
yarn test
```
