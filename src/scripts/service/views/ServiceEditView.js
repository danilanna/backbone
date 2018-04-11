import * as serviceEditTemplate from '../../../templates/service/serviceEditTemplate.hbs';
import ServiceModel from '../model/ServiceModel';
import PermissionCollection from '../../permission/collection/PermissionCollection';
import AlertView from '../../components/alert/AlertView';

export default class ServiceEditView extends Backbone.Marionette.View {
  constructor(options) {
    super({
      el: '#container',
      events: {
        'submit @ui.form': 'submit',
      },
      ui: {
        api: '#api',
        method: '#method',
        permissions: '#permissions',
        form: '#form',
      },
    });
    this.isNew = options.isNew;
    this.model = new ServiceModel(options);
    this.render();
  }

  get template() {
    return serviceEditTemplate;
  }

  buildPermissions() {
    const permissions = [];
    $('#permissions li input[type=checkbox]').each((idx, element) => {
      const input = $(element);
      if ($(element).is(':checked')) {
        permissions.push(input.val());
      }
    });
    return permissions;
  }

  submit(event) {
    event.preventDefault();
    this.model.set('method', this.ui.method.val());
    this.model.set('api', this.ui.api.val());
    this.model.set('permissions', this.buildPermissions());
    this.model.save({}, {
      success: () => {
        new AlertView({ message: `Service ${this.ui.api.val()} saved!`, type: 'success' }).render();
        Backbone.history.navigate('/service', { trigger: true });
      },
    });
  }

  sucessPermission(model, permissions) {
    this.permissions = permissions;

    if (this.isNew) {
      this.$el.html(this.template({ permissions: this.permissions }));
      this.bindUIElements();
    } else {
      this.model.fetch({
        success: (newModel, response, options) => {
          this.successService(newModel, response, options);
        },
      });
    }
  }

  successService(model, response) {
    const servicePermissionsIds = _.map(response.permissions, '_id');

    this.$el.html(this.template({ service: response, permissions: this.permissions }));
    this.bindUIElements();

    this.permissions.forEach((val) => {
      if (servicePermissionsIds.includes(val._id)) {
        this.ui.permissions.find(`#${val._id}`).attr('checked', 'checked');
      }
    });
  }

  render() {
    new PermissionCollection().fetch({
      success: (data, response, options) => {
        this.sucessPermission(data, response, options);
      },
    });
  }
}
