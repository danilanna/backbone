import * as userEditTemplate from '../../../templates/user/userEditTemplate.hbs';
import UserModel from '../model/UserModel.js';
import PermissionCollection from '../../permission/collection/PermissionCollection.js';
import AlertView from '../../components/alert/AlertView.js';

export default class UserEditView extends Backbone.Marionette.View {

  constructor(options) {
    super({
      el: '#container',
      events: { 
        'submit @ui.form': 'submit'
      },
      ui: {
        name: '#name',
        email: '#email',
        admin: '#yes',
        isNotAdmin: '#no',
        permissions: '#permissions',
        form: '#form'
      }
    });
    this.isNew = options.isNew;
    this.model = new UserModel(options);
  }

  get template() {
    return userEditTemplate;
  }

  buildPermissions() {
    let permissions = [];
    $('#permissions li input[type=checkbox]').each((idx, element) => {
      let input = $(element);
      if ( $(element).is(':checked') ) {
        permissions.push(input.val());
      }
    });
    return permissions;
  }

  submit() {
    event.preventDefault();
    this.model.set('email', this.ui.email.val());
    this.model.set('name', this.ui.name.val());
    this.model.set('admin', this.ui.admin.prop('checked'));
    this.model.set('permissions', this.buildPermissions());
    this.model.save({}, {
      success: (model, response, options) => {
        new AlertView({message: 'User ' + this.ui.name.val() + ' saved!', type: 'success'}).render();
        Backbone.history.navigate('/user', {trigger: true});
      }
    });
  }

  sucessPermission(model, response, options) {
     this.permissions = response;

     if ( this.isNew ) {
      this.$el.html( this.template({permissions: this.permissions}) );
      this.bindUIElements();
    } else {
      this.model.fetch({
        success: (model, response, options) => {
          this.successUser(model, response, options);
        }
      });
    }
  }

  successUser(model, response, options) {
    const userPermissionsIds = _.map(response.permissions, '_id');

    this.$el.html( this.template( {user: response, permissions: this.permissions} ) );
    this.bindUIElements();

    this.permissions.forEach((val)=> {
      if ( userPermissionsIds.includes(val._id) ) {
        this.ui.permissions.find('#'+val._id).attr('checked', 'checked');
      }
    })

    if ( response.admin ) {
      this.ui.admin.attr('checked', 'checked');
    } else {
      this.ui.isNotAdmin.attr('checked', 'checked');
    }

  }

  render() {
    new PermissionCollection().fetch({
      success: (data, response, options) => {
        this.sucessPermission(data, response, options)
      }
    });
  }

}