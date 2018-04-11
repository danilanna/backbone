import RootView from '../root/RootView';
import HomeView from '../home/views/HomeView';
import DashboardView from '../dashboard/views/DashboardView';
import UserView from '../user/views/UserView';
import UserEditView from '../user/views/UserEditView';
import PermissionView from '../permission/views/PermissionView';
import PermissionEditView from '../permission/views/PermissionEditView';
import ServiceView from '../service/views/ServiceView';
import ServiceEditView from '../service/views/ServiceEditView';

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
    this.renderView(UserEditView, { _id: param, isNew: (!param) });
  }

  permission() {
    this.renderView(PermissionView);
  }

  permissionEdit(param) {
    this.renderView(PermissionEditView, { _id: param, isNew: (!param) });
  }

  service() {
    this.renderView(ServiceView);
  }

  serviceEdit(param) {
    this.renderView(ServiceEditView, { _id: param, isNew: (!param) });
  }

  renderView(ViewClass, options) {
    // close current view
    if (this.currentView) {
      this.currentView.undelegateEvents();
      this.currentView.unbind();
    }

    // store reference to next view
    this.currentView = new ViewClass(options);

    rootView.renderView(this.currentView);
  }
}
