import * as dashboardTemplate from '../../../templates/dashboard/dashboardTemplate.hbs';

export default class DashboardView extends Backbone.Marionette.View {
  constructor() {
    super({
      el: '#container',
      events: { 'click a': 'setNavBarActive' },
    });
    this.render();
  }

  get template() {
    return dashboardTemplate;
  }

  render() {
    this.$el.html(this.template());
    return this;
  }

  setNavBarActive(event) {
    const element = $(`#${$(event.currentTarget).data().target}`);
    element.siblings().removeClass('active');
    element.addClass('active');
  }
}
