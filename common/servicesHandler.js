const servicesHandler = {
  async loadServices () {
    let services = await require('../services')()
    for (let service of services) {
      console.log('loading service ' + service.name)
      if (service.init) {
        await service.init()
      }
      console.log('loading service ' + service.name + ' done')
      this[service.name] = service
    }
  }
}
module.exports = servicesHandler
