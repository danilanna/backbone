import HomeView from '../home/views/HomeView.js';
import Router from './Router.js';
import Request from './Request.js';
import NavigationView from '../components/navigation/NavigationView.js';

export default class App extends Backbone.Marionette.Application {

    constructor() {
        super({region: '#app-view'});
    }

    onStart() {
    	new Router();
    	new Request();
    	new NavigationView();
    	Backbone.history.start();
    }
};