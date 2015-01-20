define([
    'angular',
    'applicationConfig',
    'applicationController',
    'authManager',
    'restManager',
    'underscore',
    'aclManager',
    'liveDirective'
], function (
        angular,
        applicationConfig,
        applicationController,
        authManager,
        restManager,
        _,
        liveDirective) {

    var APIurl = 'http://api' + window.location.host;

    var application = angular.module('applicationModule', ['ngRoute', 'restangular', 'ui.router', ]);

    application.constant("API", {
        "URL": APIurl
    });

    application.config(applicationConfig);

    application.factory('authManager', authManager);
    application.factory('restManager', restManager);

    application.directive('live', liveDirective);

    application.controller('applicationController', applicationController);

    application.run(['$rootScope', function ($rootScope) {
            $rootScope.APIurl = APIurl;
        }]);
});