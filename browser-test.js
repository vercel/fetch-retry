/* globals describe, it, expect, jasmine, beforeEach */

const fetchRetry = require('./index')

describe('fetch-retry', () => {
  let fetchSpy

  beforeEach(() => {
    fetchSpy = jasmine.createSpy('fetch').and.callFake((url, opts) => {
      let status = 200
      let responseText = ''
      if (url === 'http://success.com/200') {
        status = 200
        responseText = 'yay'
      }
      const res = {
        status,
        async text () {
          return responseText
        }
      }

      return Promise.resolve(res)
    })
  })

  it('adds to pass fetch object', () => {
    const ft = fetchRetry(window.fetch)
    expect(ft).toBeTruthy()
  })

  it('passes on 200', async () => {
    const res = await fetchRetry(fetchSpy)('http://success.com/200')
    expect(await res.text()).toBe('yay')
  })
})
