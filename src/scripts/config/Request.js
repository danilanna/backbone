import AlertView from '../components/alert/AlertView';

export default class Request {
  constructor() {
    this.configSync();
    this.configResponseError();
    this.configRequest();
  }

  configSync() {
    const backboneSync = Backbone.sync;
    let token;
    let refreshToken;

    Backbone.sync = (method, model, options) => {
      token = localStorage.getItem('token');
      refreshToken = localStorage.getItem('refreshToken');

      _.defaults(options, {
        contentType: 'application/json',
        async: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Content-Length, Content-Type',
          Authorization: `Bearer ${token}`,
          'x-refresh-token': refreshToken,
        },
        url: `http://localhost:8083/api${_.isFunction(model.url) ? model.url() : model.url}`,
      });

      /*
        * Call the stored original Backbone.sync
        * method with the new url property
        */
      backboneSync(method, model, options);
    };
  }

  configRequest() {
    $(document).ajaxSend(() => {
      jQuery('#loading').modal();
    });

    $(document).ajaxComplete((event, xhr) => {
      const token = xhr.getResponseHeader('x-token');
      const refreshToken = xhr.getResponseHeader('x-refresh-token');

      if (token && refreshToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }

      jQuery('#loading').modal('hide');
    });
  }

  configResponseError() {
    const permissionDeniedMessage = 'Looks like you do not have permission to do this action! Please contact the administrator.';
    const unauthorizedMessage = 'Please sign-in first.';
    const serverErrorMessage = 'Something got wrong. Please contact the administrator.';

    $(document).ajaxError((event, response) => {
      if (response.status === 403) {
        new AlertView({ message: permissionDeniedMessage, type: 'danger' }).render();
      } else if (response.status === 0 || response.status === 401) {
        new AlertView({ message: unauthorizedMessage, type: 'danger' }).render();
        Backbone.history.navigate('/home', { trigger: true });
      } else if (response.responseJSON && response.responseJSON.message) {
        new AlertView({ message: response.responseJSON.message, type: 'danger' }).render();
      } else {
        new AlertView({ message: serverErrorMessage, type: 'danger' }).render();
      }
    });
  }
}
