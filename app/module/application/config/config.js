define([], function() {
    'use strict';

    function config($routeProvider, RestangularProvider, API) {
        $routeProvider.otherwise({redirectTo: '/home'});
        RestangularProvider.setBaseUrl(API.URL);
    }

    config.$inject = ['$routeProvider', 'RestangularProvider', 'API'];

    return config;
});