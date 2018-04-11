import RouterController from './RouterController';

export default class Router extends Backbone.Marionette.AppRouter {
  constructor() {
    super({
      appRoutes: {
        '': 'home',
        '#': 'home',
        '/': 'home',
        home: 'home',
        dashboard: 'dashboard',
        user: 'user',
        'user/edit': 'userEdit',
        'user/edit/:param': 'userEdit',
        permission: 'permission',
        'permission/edit': 'permissionEdit',
        'permission/edit/:param': 'permissionEdit',
        service: 'service',
        'service/edit': 'serviceEdit',
        'service/edit/:param': 'serviceEdit',
      },
      controller: new RouterController(),
    });
  }
}
