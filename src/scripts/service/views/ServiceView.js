import * as serviceTemplate from '../../../templates/service/serviceTemplate.hbs';
import ServiceCollection from '../collection/ServiceCollection.js';
import ServiceModel from '../model/ServiceModel.js';
import AlertView from '../../components/alert/AlertView.js';

export default class ServiceView extends Backbone.Marionette.View {

  constructor() {
    super({
      el: '#container',
      events: {
        'click #delete': 'delete', 
        'click #action': 'deleteService'
      }
    });
    this.model = new ServiceCollection();
    this.modalValues = {
      title: 'Delete Service',
      saveText: 'Delete Service',
      description: 'Are you sure you want to delete the service?',
      target: 'serviceModal'
    };
    this.render();
  }

  get template() {
    return serviceTemplate;
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
        this.$el.html( this.template( {services: response.docs, modalValues: this.modalValues} ) );
        this.setPagination(response, this.page);
      }
    });
  }

  delete(event) {
    event.preventDefault();
    const service = $(event.currentTarget).data();
    this.modalValues.data = {_id: service.id, api: service.api};
  }

  deleteService() {
    const model = new ServiceModel({_id: this.modalValues.data._id});
    model.destroy({
      success: (model, response, options) => {
        jQuery('#serviceModal').modal('hide');
        new AlertView({message: 'Service ' + this.modalValues.data.api + ' deleted!', type: 'success'}).render();
        this.render();
      }
    });
  }

}