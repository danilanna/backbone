import UserModel from '../model/UserModel';

export default class UserCollection extends Backbone.Collection {
  constructor() {
    super({ model: UserModel });
    this.url = '/users';
  }
}
