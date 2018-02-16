import * as userTemplate from '../../../templates/user/userTemplate.hbs';
import UserCollection from '../collection/UserCollection.js';
import UserModel from '../model/UserModel.js';
import AlertView from '../../components/alert/AlertView.js';

export default class UserView extends Backbone.Marionette.View {

  constructor() {
    super({
      el: '#container',
      events: {
        'click #delete': 'delete', 
        'click #action': 'deleteUser'
      }
    });
    this.model = new UserCollection();
    this.modalValues = {
      title: 'Delete User',
      saveText: 'Delete User',
      description: 'Are you sure you want to delete the user?',
      target: 'userModal'
    };
    this.render();
  }

  get template() {
    return userTemplate;
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
        this.$el.html( this.template( {users: response.docs, modalValues: this.modalValues} ) );
        this.setPagination(response, this.page);
      }
    });
  }

  delete(event) {
    event.preventDefault();
    const user = $(event.currentTarget).data();
    this.modalValues.data = {_id: user.id, name: user.name};
  }

  deleteUser() {
    const model = new UserModel({_id: this.modalValues.data._id});
    model.destroy({
      success: (model, response, options) => {
        jQuery('#userModal').modal('hide');
        new AlertView({message: 'User ' + this.modalValues.data.name + ' deleted!', type: 'success'}).render();
        this.render();
      }
    });
  }

}