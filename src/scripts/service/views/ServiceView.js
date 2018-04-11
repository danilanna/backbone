import * as serviceTemplate from '../../../templates/service/serviceTemplate.hbs';
import ServiceCollection from '../collection/ServiceCollection';
import ServiceModel from '../model/ServiceModel';
import MainView from '../../main/MainView';

export default class ServiceView extends MainView {
  constructor() {
    const modalValues = {
      title: 'Delete Service',
      saveText: 'Delete Service',
      description: 'Are you sure you want to delete the service?',
      target: 'serviceModal',
    };
    super(ServiceModel, ServiceCollection, modalValues, 'Service ', serviceTemplate);
  }
}
