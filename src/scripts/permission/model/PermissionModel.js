export default class PermissionModel extends Backbone.Model {
	constructor(options){
		super(options);
		this.url = '/permissions/' + (options._id ? options._id : '');
	}

	defaults() {
		return {
			name: '',
    		description: '',
		}
	}

	get idAttribute() {
		return '_id';
	}
};