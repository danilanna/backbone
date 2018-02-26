import * as homeTemplate from '../../../templates/home/homeTemplate.hbs';
import HomeModel from '../model/HomeModel.js';
import AlertView from '../../components/alert/AlertView.js';

export default class HomeView extends Backbone.Marionette.View {

  constructor() {
    super({
      el: '#container',
      events: { 'submit @ui.form': 'submit' },
      ui: {
        email: '#email',
        form: '#form',
        password: '#password'
      }
    });
  }

  submit() {
    event.preventDefault();
    const model = new HomeModel({email: this.ui.email.val(), password: this.ui.password.val()});
    model.save({}, {
      success: (model, response, options) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        Backbone.history.navigate('/dashboard', {trigger: true});
      }
    });
  }

  get template() {
    return homeTemplate;
  }

  onRender() {
    this.$el.html( this.template() );
    this.bindUIElements();
    return this;
  }

}