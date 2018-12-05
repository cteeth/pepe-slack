const sh = require('../common/servicesHandler')
const fs = require('fs').promises

module.exports = function register (server, options) {

  server.route({
    method: 'GET',
    path: '/{mood}',
    handler: async function (request, h) {
      await server.register(require('inert'));
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
