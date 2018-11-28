const Hapi = require('hapi')
const servicesHandler = require('./common/servicesHandler')
const loadRoutes = require('routes')
// Create a server with a host and port
const server = Hapi.server({
  port: process.env.PORT
})

// Start the server
async function start () {
  try {
    await servicesHandler.loadServices()
    let routes = await loadRoutes()
    await server.register(routes)
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()
