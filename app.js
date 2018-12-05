const Hapi = require('hapi')
const sh = require('./common/servicesHandler')
const loadRoutes = require('./routes')
// Create a server with a host and port
const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT || 3001
})

// Start the server
async function start () {
  try {
    await server.register(require('inert'));
    await sh.loadServices()
    let routes = await loadRoutes()
    await server.register(routes)
    await server.initialize()
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()
