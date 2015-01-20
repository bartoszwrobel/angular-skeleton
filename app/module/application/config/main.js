'use strict';
require.config({
    baseUrl: '/',
    waitSeconds: 0,
//    urlArgs: "_dc=" + (new Date()).getTime(),
    paths: {
        bootstrap: 'module/application/config/bootstrap',
        domReady: 'vendor/requirejs-domready/domReady',
        angular: 'vendor/angular/angular',
        applicationConfig: 'module/application/config/config',
        applicationController: 'module/application/controller/applicationController',
        authConfig: 'module/auth/config/config',
        authController: 'module/application/controller/authController',
        'angular-route': 'vendor/angular-route/angular-route.min',
        jquery: 'vendor/jquery/dist/jquery.min',
        restangular: 'vendor/restangular/dist/restangular.min',
        'ui-router': 'vendor/angular-ui-router/release/angular-ui-router.min',
        underscore: 'vendor/underscore/underscore',
        registerManager: 'module/application/service/registerManager',
        routeManager: 'module/application/service/routeManager',
        liveDirective: 'module/application/directive/live'
    },
    shim: {
        angular: {exports: 'angular'},
        'angular-route': ['angular'],
        restangular: ['angular'],
        'ui-router': ['angular'],
        application: ['angular']
    },
    priority: [
        'angular'
    ],
    deps: ['bootstrap']
});