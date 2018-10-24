const Hapi = require('hapi')

// Create a server with a host and port
const server = Hapi.server({
  port: process.env.PORT
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
    return {
      "text": "New comic book alert!",
      "attachments": [
          {
            "title": request.payload.text,
            "image_url": "http://i.imgur.com/dytv5Xh.png",
            "actions": [
                {
                  "name": "send",
                  "text": "Send Pepe",
                  "style": "good",
                  "type": "button",
                  "value": "send"
                },
                {
                    "name": "change",
                    "text": "Change Pepe",
                    "type": "button",
                    "value": "change"
                },
                {
                    "name": "cancel",
                    "text": "Discard Pepe",
                    "style": "danger",
                    "type": "button",
                    "value": "cancel"
                }
            ]
          }
      ]
    }
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
