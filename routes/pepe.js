const sh = require('../common/servicesHandler')

module.exports = function register (server, options) {
  server.route({
    method: 'GET',
    path: '/{mood}/{pepe?}',
    handler: async function (request, h) {
      const { pepe } = sh
      let chosenPepe = await pepe.giveMePepe(request.params.pepe)
      console.log(chosenPepe)
      return h.file(chosenPepe)
    }
  })
}
