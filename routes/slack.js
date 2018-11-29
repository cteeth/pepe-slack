const sh = require('../common/servicesHandler')
let lastAction = {}
module.exports = function register (server, options) {
    server.route({
      method: 'POST',
      path: '/',
      handler: async function (request, h) {
        const { payload } = request
        const { slack } = sh
        let response = await slack.process(payload)
        lastAction = {
          request,
          payload
        }
        return response
      }
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return {
          plugins: server.plugins,
          registrations: server.registrations,
          lastAction
        } 
      }
    })
  }

