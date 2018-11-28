const servicesHandler = require('./serviceHandler')

module.exports = class Service {
  constructor () {
    this.name = this.constructor.name
    servicesHandler[this.name] = this
  }
}
