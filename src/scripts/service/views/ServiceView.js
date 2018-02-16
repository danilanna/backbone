import * as serviceTemplate from '../../../templates/service/serviceTemplate.hbs';
import ServiceCollection from '../collection/ServiceCollection.js';
import ServiceModel from '../model/ServiceModel.js';
import MainView from '../../main/MainView.js';

export default class ServiceView extends MainView {

  constructor() {
    const modalValues = {
      title: 'Delete Service',
      saveText: 'Delete Service',
      description: 'Are you sure you want to delete the service?',
      target: 'serviceModal'
    };
    super(ServiceModel, ServiceCollection, modalValues, 'Service ', serviceTemplate);
  }

}