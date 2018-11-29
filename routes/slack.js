const sh = require('../common/servicesHandler')
let lastAction = {}
let lastError
module.exports = function register (server, options) {
  server.route({
    method: 'POST',
    path: '/',
    handler: async function (request, h) {
      const { payload } = request
      const { slack } = sh

      lastAction = {
        request,
        payload
      }
      try {
        let response = await slack.process(payload)
        return response
      } catch (e) {
        lastError = e
        throw e
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return {
        lastAction
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/errors',
    handler: function (request, h) {
      return {
        lastError
      }
    }
  })
}
