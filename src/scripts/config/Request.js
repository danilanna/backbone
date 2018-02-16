import AlertView from '../components/alert/AlertView.js';

export default class Request {

    constructor() {
        this.configSync();
        this.configResponseError();
        this.configRequest();
    }

    configSync() {
        let backboneSync = Backbone.sync,
            token,
            refreshToken;

        Backbone.sync = (method, model, options) => {

            token = localStorage.getItem('token'),
            refreshToken = localStorage.getItem('refreshToken');

            _.defaults( options, {
                contentType: 'application/json',
                async: true,
                headers: {}
            });

            options.headers = _.extend( options.headers, {
            	'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        		'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Content-Length, Content-Type'
            });

            if(token && refreshToken) {
                options.headers = _.extend( options.headers, {
                    'Authorization': 'Bearer ' + token,
                    'x-refresh-token': refreshToken
                });
            }

            /*
             * Change the `url` property of options to begin
             * with the URL from settings
             * This works because the options object gets sent as
             * the jQuery ajax options, which includes the `url` property
             */
            options = _.extend(options, {
                url: 'http://localhost:8083/api' + (_.isFunction(model.url) ? model.url() : model.url)
            });

            
            /*
             * Call the stored original Backbone.sync
             * method with the new url property
             */
            backboneSync(method, model, options);
        };

    }

    configRequest() {
        $( document ).ajaxSend(() => {
            jQuery('#loading').modal();
        });

        $( document ).ajaxComplete((event, xhr, settings ) => {
            
            const token = xhr.getResponseHeader('x-token'),
                    refreshToken = xhr.getResponseHeader('x-refresh-token');

            if ( token && refreshToken ) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
            }

            jQuery('#loading').modal('hide');

        });
    }

    configResponseError() {
        const permissionDeniedMessage = 'Looks like you do not have permission to do this action! Please contact the administrator.',
            unauthorizedMessage = 'Please sign-in first.',
            serverErrorMessage = 'Something got wrong. Please contact the administrator.';

        $( document ).ajaxError(( event, response, settings ) => {
            if ( response.status === 403 ) {
                new AlertView({message: permissionDeniedMessage, type: 'danger'}).render();
            } else if ( response.status === 0 ) {
                new AlertView({message: unauthorizedMessage, type: 'danger'}).render();
                Backbone.history.navigate('/home', {trigger: true});
            } else if ( response.responseJSON && response.responseJSON.message ) {
                new AlertView({message: response.responseJSON.message, type: 'danger'}).render();
            } else {
                new AlertView({message: serverErrorMessage, type: 'danger'}).render();
            }
        })

    }

}