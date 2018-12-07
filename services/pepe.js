const Service = require('../common/Service')
const { join } = require('path')
const { readdir } = require('fs').promises

module.exports = class SlackService extends Service {
  async giveMePepe (filename) {
    filename = decodeURI(filename)
    console.log(`filename: ${filename}`)
    let pepesPaths = await this.giveMePepes()
    if (filename !== undefined) {
      for (let pepe in pepesPaths) {
        console.log(`pepePath: ${pepe}`)
        if (pepe.includes(filename)){
          console.log('Filename found!')
          return pepe
        }
      }
    }
    console.log('Filename not found!')
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
