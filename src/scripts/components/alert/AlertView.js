import * as alertTemplate from '../../../templates/components/alert/alertTemplate.hbs';
import AlertModel from './AlertModel.js';

export default class AlertView extends Backbone.Marionette.View {

  constructor(options) {
    super({
        el: '#alerts',
        triggers: { 'click @ui.close': 'close' },
        ui: {
          close: '#close'
        }
      });
    this.model = new AlertModel(options);
  }

  get template() {
    return alertTemplate;
  }

  onClose() {
    this.$el.hide();
  }

  render() {
    this.$el.html( this.template(this.model.toJSON()) );
    this.$el.show();
    return this;
  }

}