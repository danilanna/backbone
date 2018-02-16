import * as permissionTemplate from '../../../templates/permission/permissionTemplate.hbs';
import PermissionCollection from '../collection/PermissionCollection.js';
import PermissionModel from '../model/PermissionModel.js';
import AlertView from '../../components/alert/AlertView.js';

export default class PermissionView extends Backbone.Marionette.View {

  constructor() {
    super({
      el: '#container',
      events: {
        'click #delete': 'delete', 
        'click #action': 'deletePermission'
      }
    });
    this.model = new PermissionCollection();
    this.modalValues = {
      title: 'Delete Permission',
      saveText: 'Delete Permission',
      description: 'Are you sure you want to delete the permission?',
      target: 'permimssionModal'
    };
    this.render();
  }

  get template() {
    return permissionTemplate;
  }

  render() {
    this.search();
  }

  setPagination(response, currentPage) {
    jQuery('#pagination').twbsPagination({
      totalPages: response.pages,
      visiblePages: 5,
      startPage: currentPage || 1,
    }).on('page', (evt, page) => {
        this.search(page);
    });;
  }

  search(page) {
    this.page = page;
    this.model.fetch({
      data: {
        page: page || 1,
        limit: 5
      },
      success: (model, response, options) => {
        this.$el.html( this.template( {permissions: response.docs, modalValues: this.modalValues} ) );
        this.setPagination(response, this.page);
      }
    });
  }

  delete(event) {
    event.preventDefault();
    const permission = $(event.currentTarget).data();
    this.modalValues.data = {_id: permission.id, name: permission.name};
  }

  deletePermission() {
    const model = new PermissionModel({_id: this.modalValues.data._id});
    model.destroy({
      success: (model, response, options) => {
        jQuery('#permimssionModal').modal('hide');
        new AlertView({message: 'Permission ' + this.modalValues.data.name + ' deleted!', type: 'success'}).render();
        this.render();
      }
    });
  }

}