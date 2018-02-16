import * as permissionTemplate from '../../../templates/permission/permissionTemplate.hbs';
import PermissionCollection from '../collection/PermissionCollection.js';
import PermissionModel from '../model/PermissionModel.js';
import MainView from '../../main/MainView.js';

export default class PermissionView extends MainView {

  constructor() {
    const modalValues = {
      title: 'Delete Permission',
      saveText: 'Delete Permission',
      description: 'Are you sure you want to delete the permission?',
      target: 'permimssionModal'
    };
    super(PermissionModel, PermissionCollection, modalValues, 'Permission ', permissionTemplate);
  }

}