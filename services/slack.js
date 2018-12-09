const Service = require('../common/Service')
const { join } = require('path')
const { readdir } = require('fs').promises

module.exports = class SlackService extends Service {
  async process (body) {
    let { payload, text } = body
    let pepe
    if (payload !== undefined) {
      // Answer to interactive message
      let action = JSON.parse(payload).actions[0]
      switch (action.name) {
        case 'send':
          console.log(payload)
          console.log(JSON.parse(payload))
          pepe = JSON.parse(action.value)
          return {
            response_type: 'in_channel',
            as_user: true,
            attachments: [
              {
                title: pepe.mood,
                image_url: pepe.image
              }
            ],
            delete_original: true
          }
        case 'change':
          pepe = JSON.parse(action.value)
          let newImage = pepe.image
          while (pepe.image === newImage) {
            newImage = await this.image(pepe.mood)
          }
          return this.interactive(pepe.mood, newImage, true)
        default:
          return {
            delete_original: true
          }
      }
    } else {
      // New message
      return this.interactive(text, await this.image(text))
    }
  }

  interactive (text, newImage, override = false) {
    let msg = {
      as_user: true,
      attachments: [
        {
          title: text,
          image_url: newImage,
          callback_id: 'pepe',
          actions: [
            {
              name: 'send',
              text: 'Send Pepe',
              style: 'primary',
              type: 'button',
              value: JSON.stringify({
                mood: text,
                image: newImage
              })
            },
            {
              name: 'change',
              text: 'Another Pepe',
              type: 'button',
              value: JSON.stringify({
                mood: text,
                image: newImage
              })
            },
            {
              name: 'cancel',
              text: 'Discard Pepe',
              style: 'danger',
              type: 'button',
              value: 'cancel'
            }
          ]
        }
      ]
    }
    if (override === true) {
      msg.delete_original = true
    }
    return msg
  }

  async image (mood) {
    const path = join(__dirname, '/../assets/pepes')
    let files = await readdir(path)
    let filename = files[Math.floor(Math.random() * files.length)]
    return `https://pepe-slack.herokuapp.com/pepe/${encodeURI(mood)}/${encodeURI(filename)}`
  }
}
