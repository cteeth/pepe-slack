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
    if ('payload' in request.payload) {
      // Answer to interactive message
      action = JSON.parse(request.payload.payload).actions[0]
      switch (action.name) {
        case 'send':
          pepe = JSON.parse(action.value)
          return {
            "response_type": "in_channel",
            "as_user": true,
            "attachments": [
                {
                  "title": pepe.mood,
                  "image_url": pepe.image,
                }
            ],
            "delete_original": true
          }
        default:
          return {
            "delete_original": true
          }
      }
    } else {
      // New message
      return {
        "attachments": [
            {
              "title": request.payload.text,
              "image_url": "http://i.imgur.com/dytv5Xh.png",
              "callback_id": "pepe",
              "actions": [
                {
                  "name": "send",
                  "text": "Send Pepe",
                  "style": "primary",
                  "type": "button",
                  "value": JSON.stringify({
                    "mood": request.payload.text,
                    "image": "http://i.imgur.com/dytv5Xh.png"
                  })
                }, /*
                {
                    "name": "change",
                    "text": "Change Pepe",
                    "type": "button",
                    "value": JSON.stringify({
                      "mood": request.payload.text,
                      "image": "http://i.imgur.com/dytv5Xh.png"
                    })
                }, */
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
