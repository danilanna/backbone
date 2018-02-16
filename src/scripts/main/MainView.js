import AlertView from '../components/alert/AlertView.js';

export default class MainView extends Backbone.Marionette.View {

  constructor(model, collection, modalValues, name, template) {
    super({
      el: '#container',
      events: {
        'click #delete': 'showDelete', 
        'click #action': 'delete'
      }
    });
    this.collection = new collection();
    this.model = model;
    this.modalValues = modalValues;
    this.template = template;
    this.name = name;
    this.render();
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
    this.collection.fetch({
      data: {
        page: page || 1,
        limit: 5
      },
      success: (model, response, options) => {
        this.$el.html( this.template( {values: response.docs, modalValues: this.modalValues} ) );
        this.setPagination(response, this.page);
      }
    });
  }

  showDelete(event) {
    event.preventDefault();
    const element = $(event.currentTarget).data();
    this.modalValues.data = {_id: element.id, val: element.val};
  }

  delete() {
    const model = new this.model({_id: this.modalValues.data._id});
    model.destroy({
      success: (model, response, options) => {
        jQuery('#'+this.modalValues.target).modal('hide');
        new AlertView({message: this.name + this.modalValues.data.val + ' deleted!', type: 'success'}).render();
        this.render();
      }
    });
  }

}