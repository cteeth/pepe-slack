const servicesHandler = {
  async loadServices () {
    let servicesClasses = await require('../services')
    for (let ServiceClass of servicesClasses) {
      let service = new ServiceClass()
      if (service.init) {
        await service.init()
      }
    }
  }
}
module.exports = servicesHandler
