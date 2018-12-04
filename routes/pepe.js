const sh = require('../common/servicesHandler')
const fs = require('fs').promises
let lastAction = {}
let lastError
module.exports = function register (server, options) {

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{mood}',
    handler: function (request, h) {
      console.log(request.params.mood)
      let files = await fs.readdir(__dirname + '/../assets/pepes')
      for (let filename of files) {
        return h.file('../assets/pepes/' + filename)
      }
    }
  })
}
