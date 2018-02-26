import Router from './Router.js';
import Request from './Request.js';
import RootView from '../root/RootView.js';

export default class App extends Backbone.Marionette.Application {

    constructor() {
        super({});
    }

    onStart() {
    	new Router();
    	new Request();
    	new RootView();
    	Backbone.history.start();
    }
};