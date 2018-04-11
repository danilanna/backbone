import * as userTemplate from '../../../templates/user/userTemplate.hbs';
import UserCollection from '../collection/UserCollection';
import UserModel from '../model/UserModel';
import MainView from '../../main/MainView';

export default class UserView extends MainView {
  constructor() {
    const modalValues = {
      title: 'Delete User',
      saveText: 'Delete User',
      description: 'Are you sure you want to delete the user?',
      target: 'userModal',
    };
    super(UserModel, UserCollection, modalValues, 'User ', userTemplate);
  }
}
