import UserModel from '../model/UserModel.js';

export default class UserCollection extends Backbone.Collection {
	constructor(){
		super({model: UserModel});
		this.url = '/users';
	}
};