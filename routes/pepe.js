const sh = require('../common/servicesHandler')
const fs = require('fs').promises
let lastAction = {}
let lastError
module.exports = function register (server, options) {
  require('inert')

  server.route({
    method: 'GET',
    path: '/{mood}',
    handler: function (request, h) {
      console.log(request.params.mood)
      const path = __dirname + '/../assets/pepes'
      console.log(path)
      let files = await fs.readdir(path)
      for (let filename of files) {
        console.log(filename)
        return h.file('../assets/pepes/' + filename)
      }
    }
  })
}
