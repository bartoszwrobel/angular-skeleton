define([], function() {
    'use strict';

    function config($urlRouterProvider, RestangularProvider, API) {
        $urlRouterProvider.otherwise('/home');
        RestangularProvider.setBaseUrl(API.URL);
    }

    config.$inject = ['$urlRouterProvider', 'RestangularProvider', 'API'];

    return config;
});