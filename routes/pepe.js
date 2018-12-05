const sh = require('../common/servicesHandler')

module.exports = function register (server, options) {
  server.route({
    method: 'GET',
    path: '/{mood}',
    handler: async function (request, h) {
      console.log(request.params.mood)
      const { pepe } = sh
      let pepesPaths = await pepe.giveMePepes()

      return pepesPaths && pepesPaths.length && h.file(pepesPaths[0])
    }
  })
}
