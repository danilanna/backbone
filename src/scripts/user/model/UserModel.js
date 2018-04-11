export default class UserModel extends Backbone.Model {
  constructor(options) {
    super(options);
    this.url = `/users/${options._id ? options._id : ''}`;
  }

  defaults() {
    return {
      email: '',
      name: '',
      admin: false,
      password: 'password',
    };
  }

  get idAttribute() {
    return '_id';
  }
}
