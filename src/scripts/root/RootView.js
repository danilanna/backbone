import NavigationView from '../components/navigation/NavigationView.js';

export default class RootView extends Backbone.Marionette.View {

  constructor() {
    super({
      el: '#root-region',
      template: false,
      regions: {
        content: {
          el: '#content'
        },
        header: {
          el: '#nav-bar'
        }
      }
    })
    this.renderRegions();
  }

  renderRegions() {
    this.showChildView('header', new NavigationView());
  }

  renderView(view) {
    this.showChildView('content', view);
  }

};