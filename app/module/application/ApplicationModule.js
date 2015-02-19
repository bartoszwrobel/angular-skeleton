define([
    'angular',
    'applicationConfig',
    'applicationController',
    'authManager',
    'restManager',
    'underscore',
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
    
    application.controller('applicationController', applicationController);

    application.config(applicationConfig);

    application.factory('authManager', authManager);
    application.factory('restManager', restManager);

    application.directive('live', liveDirective);

    

    application.run(['$rootScope', function ($rootScope) {
            $rootScope.APIurl = APIurl;
        }]);
});