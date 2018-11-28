const serviceHandler = require('../common/servicesHandler')
module.exports = {
  async register (server, options) {
    server.route({
      method: 'POST',
      path: '/slack',
      handler: function (request, h) {
        const { payload } = request
        const { slack } = serviceHandler
        return slack.process(payload)
      }
    })
  }
}
