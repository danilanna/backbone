export default class ServiceModel extends Backbone.Model {
  constructor(options) {
    super(options);
    this.url = `/services/${options._id ? options._id : ''}`;
  }

  defaults() {
    return {
      api: '',
      method: '',
    };
  }

  get idAttribute() {
    return '_id';
  }
}
