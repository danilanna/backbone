import ServiceModel from '../model/ServiceModel.js';

export default class ServiceCollection extends Backbone.Collection {
	constructor(){
		super({model: ServiceModel});
		this.url = '/services';
	}
};