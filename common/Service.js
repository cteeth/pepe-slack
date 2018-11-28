const servicesHandler = require('./servicesHandler')

module.exports = class Service {
  constructor (name) {
    this.name = name
  }

  get services () {
    let sh = { ...servicesHandler }
    delete sh.loadServices
    return sh
  }
}
