const Service = require('../common/Service')
const { join } = require('path')
const { readdir } = require('fs').promises

module.exports = class SlackService extends Service {
  async giveMePepe (name) {

  }

  async giveMePepes () {
    const path = join(__dirname, '/../assets/pepes')
    console.log(path)
    let files = await readdir(path)
    files = files.map(filename => {
      return join(path, filename)
    })
    return files
  }
}
