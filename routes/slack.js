const sh = require('../common/servicesHandler')
module.exports = {
  async register (server, options) {
    server.route({
      method: 'POST',
      path: '/',
      handler: function (request, h) {
        const { payload } = request
        const { slack } = sh
        return slack.process(payload)
      }
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return 'online'
      }
    })
  }
}
