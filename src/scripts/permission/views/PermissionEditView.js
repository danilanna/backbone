import * as permissionEditTemplate from '../../../templates/permission/permissionEditTemplate.hbs';
import PermissionModel from '../model/PermissionModel';
import AlertView from '../../components/alert/AlertView';

export default class PermissionEditView extends Backbone.Marionette.View {
  constructor(options) {
    super({
      el: '#container',
      events: {
        'submit @ui.form': 'submit',
      },
      ui: {
        name: '#name',
        description: '#description',
        form: '#form',
      },
    });
    this.isNew = options.isNew;
    this.model = new PermissionModel(options);
    this.render();
  }

  get template() {
    return permissionEditTemplate;
  }

  submit(event) {
    event.preventDefault();
    this.model.set('description', this.ui.description.val());
    this.model.set('name', this.ui.name.val());
    this.model.save({}, {
      success: () => {
        new AlertView({ message: `Permission ${this.ui.name.val()} saved!`, type: 'success' }).render();
        Backbone.history.navigate('/permission', { trigger: true });
      },
    });
  }

  render() {
    if (this.isNew) {
      this.$el.html(this.template());
      this.bindUIElements();
    } else {
      this.model.fetch({
        success: (model, response) => {
          this.$el.html(this.template({ permission: response }));
          this.bindUIElements();
        },
      });
    }
  }
}
