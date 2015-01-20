define([], function () {
    'use strict';

    function config($stateProvider) {

        $stateProvider.state('login', {
            url: "/login",
            views: {
                'content': {
                    templateUrl: 'app/module/auth/view/templates/login.html',
                    controller: 'authController'
                }
            }
        });
    }

    config.$inject = ['$stateProvider'];

    return config;
});