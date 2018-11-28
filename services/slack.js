const Service = require('../common/Service')
const fs = require('fs').promises

module.exports = class SlackService extends Service {

    async process(payload) {
        if (payload[payload] !== undefined) {
            // Answer to interactive message
            let action = JSON.parse(payload.payload).actions[0]
            let pepe
            switch (action.name) {
                case 'send':
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
                    let new_image = pepe.image
                    while (pepe.image !== new_image) {
                        new_image = this.random()
                    }
                    return this.interactive(payload.text, new_image, true)
                default:
                    return {
                        delete_original: true
                    }
            }
        } else {
            // New message
            return this.interactive(payload.text, this.random())
        }
    }

    interactive(text, image_url, override = false) {
        let msg = {
            as_user: true,
            attachments: [
                {
                    title: text,
                    image_url: image_url,
                    callback_id: 'pepe',
                    actions: [
                        {
                            name: 'send',
                            text: 'Send Pepe',
                            style: 'primary',
                            type: 'button',
                            value: JSON.stringify({
                                mood: text,
                                image: image_url
                            })
                        },
                        {
                            name: 'change',
                            text: 'Another Pepe',
                            type: 'button',
                            value: JSON.stringify({
                                mood: text,
                                image: image_url
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

    async random() {

        return 'http://i.imgur.com/dytv5Xh.png'

    }
}
