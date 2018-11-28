const fs = require('fs').promises
const { join } = require('path')

module.exports = async function loadServices () {
  const services = []
  let files = await fs.readdir(__dirname)
  let pattern = /(.*\w*)\.js$/
  for (let file of files) {
    let name = pattern.exec(file)[1]
    if (name && file !== 'index.js') {
      let ServiceClass = require(join(__dirname, file))
      services.push(new ServiceClass(name))
    }
  }
  return services
}
