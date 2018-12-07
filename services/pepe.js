const Service = require('../common/Service')
const { join } = require('path')
const { readdir } = require('fs').promises

module.exports = class SlackService extends Service {
  async giveMePepe (filename) {
    let pepesPaths = await this.giveMePepes()
    if (filename !== undefined) {
      for (let pepe of pepesPaths) {
        if (pepe.includes(filename)){
          return pepe
        }
      }
    }
    return pepesPaths && pepesPaths.length && pepesPaths[Math.floor(Math.random() * pepesPaths.length)]
  }

  async giveMePepes () {
    const path = join(__dirname, '/../assets/pepes')
    let files = await readdir(path)
    files = files.map(filename => {
      return join(path, filename)
    })
    return files
  }
}
