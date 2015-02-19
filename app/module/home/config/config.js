define([], function () {
    'use strict';

    function config($stateProvider) {

        $stateProvider.state('home', {
            url: "/home",
            views: {
                'content': {
                    templateUrl: './app/module/home/view/templates/home.html',
                    controller: 'homeController'
                }
            },
            resolve: {
                isLogged: ['authManager', function (authManager) {
                        return authManager.isLogged();
                    }],
                isAuthorized: ['authManager', function (authManager) {
                        var availableRoles = ['administrator'];
                        return authManager.isAuthorized(availableRoles);
                    }]
            }
        });
    }

    config.$inject = ['$stateProvider'];

    return config;
});