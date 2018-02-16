export default class HomeModel extends Backbone.Model {
	constructor(options){
		super(options);
		this.url = '/authenticate';
	}
};