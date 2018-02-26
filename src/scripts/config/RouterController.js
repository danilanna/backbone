import RootView from '../root/RootView.js';
import HomeView from '../home/views/HomeView.js';
import DashboardView from '../dashboard/views/DashboardView.js';
import AlertView from '../components/alert/AlertView.js';
import UserView from '../user/views/UserView.js';
import UserEditView from '../user/views/UserEditView.js';
import PermissionView from '../permission/views/PermissionView.js';
import PermissionEditView from '../permission/views/PermissionEditView.js';
import ServiceView from '../service/views/ServiceView.js';
import ServiceEditView from '../service/views/ServiceEditView.js';

const rootView = new RootView();

export default class RouterController extends Backbone.Marionette.Object {  

  home() {
  	 this.renderView(HomeView);
  }

  dashboard() {
  	 this.renderView(DashboardView);
  }

  user() {
     this.renderView(UserView);
  }

  userEdit(param) {
     this.renderView(UserEditView, {_id: param, isNew: (param ? false : true)})
  }

  permission() {
    this.renderView(PermissionView);
  }

  permissionEdit(param) {
    this.renderView(PermissionEditView, {_id: param, isNew: (param ? false : true)});
  }

  service() {
    this.renderView(ServiceView);
  }

  serviceEdit(param) {
    this.renderView(ServiceEditView, {_id: param, isNew: (param ? false : true)});
  }

  renderView(ViewClass, options) {
    //close current view
    if (this.currentView) {
      this.currentView.undelegateEvents();
      this.currentView.unbind();
    }

    //store reference to next view
    this.currentView = new ViewClass(options);

    rootView.renderView(this.currentView);
  }
  
};