import * as homeTemplate from '../../../templates/home/homeTemplate.hbs';
import HomeModel from '../model/HomeModel';

export default class HomeView extends Backbone.Marionette.View {
  constructor() {
    super({
      el: '#container',
      events: { 'submit @ui.form': 'submit' },
      ui: {
        email: '#email',
        form: '#form',
        password: '#password',
      },
    });
    this.render();
  }

  submit(event) {
    event.preventDefault();
    const model = new HomeModel({ email: this.ui.email.val(), password: this.ui.password.val() });
    model.save({}, {
      success: (newModel, response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        Backbone.history.navigate('/dashboard', { trigger: true });
      },
    });
  }

  get template() {
    return homeTemplate;
  }

  render() {
    this.$el.html(this.template());
    this.bindUIElements();
    return this;
  }
}
