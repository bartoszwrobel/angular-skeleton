define([
    'require',
    'angular',
    'application',
    'underscore',
    'angular-route',
    'restangular',
    'ui-router'
], function (require, angular) {
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['application']);
    });
});