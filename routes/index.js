const fs = require('fs').promises
const path = require('path')

module.exports = async function loadRouters () {
  const services = []

  await fs.readdir(__dirname)

  load
}
