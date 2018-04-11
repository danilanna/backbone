import Router from './Router';
import Request from './Request';
import RootView from '../root/RootView';

export default class App extends Backbone.Marionette.Application {
  constructor() {
    super({});
  }

  onStart() {
    const router = new Router();
    const request = new Request();
    const rootView = new RootView();
    Backbone.history.start();
  }
}
