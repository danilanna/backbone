import ServiceModel from '../model/ServiceModel';

export default class ServiceCollection extends Backbone.Collection {
  constructor() {
    super({ model: ServiceModel });
    this.url = '/services';
  }
}
