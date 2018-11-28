const fs = require('fs').promises
const { join } = require('path')

module.exports = async function loadRoutes () {
  const routes = []
  let files = await fs.readdir(__dirname)
  let pattern = /(.*\w*)\.js$/
  for (let file of files) {
    let name = pattern.exec(file)[1]
    if (name && file !== 'index.js') {
      let route = require(join(__dirname, file))
      let plugin = {
        plugin: {
          name,
          ...route
        },
        options: {
          routes: {
            prefix: '/' + name
          }
        }
      }
      routes.push(plugin)
    }
  }
  return routes
}
