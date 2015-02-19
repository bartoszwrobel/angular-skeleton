require([
    //libralies
    'angular',
    'underscore',
    'angular-route',
    'restangular',
    'ui-router',
    //modules
    'templates',
    'applicationModule',
    'authModule',
    'homeModule'
], function (angular) {
        angular.bootstrap(document, [
            'templates-main',
            'applicationModule',
            'authModule',
            'homeModule'
        ]);
});