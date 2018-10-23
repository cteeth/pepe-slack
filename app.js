const Hapi = require('hapi')

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3001
})

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function(request, h) {
    return 'hello world'
  }
})

let lastAction
// Add the route
server.route({
  method: 'POST',
  path: '/slack',
  handler: function(request, h) {
    lastAction = request.payload
  }
})

// Add the route
server.route({
  method: 'GET',
  path: '/resp',
  handler: function(request, h) {
    return lastAction
  }
})

// Start the server
async function start() {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()
