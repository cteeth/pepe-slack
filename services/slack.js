
module.exports = class SlackService {
  async process (payload) {
    if (payload[payload] !== undefined) {
      // Answer to interactive message
      let action = JSON.parse(payload.payload).actions[0]
      switch (action.name) {
        case 'send':
          let pepe = JSON.parse(action.value)
          return {
            'response_type': 'in_channel',
            'as_user': true,
            'attachments': [
              {
                'title': pepe.mood,
                'image_url': pepe.image
              }
            ],
            'delete_original': true
          }
        default:
          return {
            'delete_original': true
          }
      }
    } else {
      // New message
      return {
        as_user: true,
        'attachments': [
          {
            'title': payload.text,
            'image_url': 'http://i.imgur.com/dytv5Xh.png',
            'callback_id': 'pepe',
            'actions': [
              {
                'name': 'send',
                'text': 'Send Pepe',
                'style': 'primary',
                'type': 'button',
                'value': JSON.stringify({
                  'mood': payload.text,
                  'image': 'http://i.imgur.com/dytv5Xh.png'
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
                'name': 'cancel',
                'text': 'Discard Pepe',
                'style': 'danger',
                'type': 'button',
                'value': 'cancel'
              }
            ]
          }
        ]
      }
    }
  }
}
