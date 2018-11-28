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
    await sh.loadServices()
    await server.register(await loadRoutes())
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()
