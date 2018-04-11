import * as navigationTemplate from '../../../templates/components/navigation/navigationTemplate.hbs';

export default class NavigationView extends Backbone.Marionette.View {
  constructor() {
    super({
      el: '#nav-bar',
      events: {
        'click a': 'toggle',
        'click #action': 'logout',
      },
    });
    this.modalValues = {
      title: 'Logout',
      saveText: 'Logout',
      description: 'Are you sure you want to logout?',
      target: 'navigationModal',
    };
    this.render();
  }

  toggle(event) {
    this.currentActive = $(`#${$(event.currentTarget).data().target}`);
    this.removeActive();
    this.currentActive.addClass('active');
  }

  removeActive() {
    if (this.currentActive) {
      this.currentActive.siblings().removeClass('active');
    }
  }

  logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.removeActive();
    jQuery('#navigationModal').modal('hide');
    Backbone.history.navigate('/home', { trigger: true });
  }

  get template() {
    return navigationTemplate;
  }

  render() {
    this.$el.html(this.template({ modalValues: this.modalValues }));
    return this;
  }
}
