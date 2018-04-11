import PermissionModel from '../model/PermissionModel';

export default class PermissionCollection extends Backbone.Collection {
  constructor() {
    super({ model: PermissionModel });
    this.url = '/permissions';
  }
}
