'use strict';
require.config({
    baseUrl: './../../../../',
    waitSeconds: 0,
//    urlArgs: "_dc=" + (new Date()).getTime(),
    paths: {
        bootstrap: 'app/module/application/config/bootstrap',
        angular: 'vendor/angular/angular',
        // application module
        applicationModule: 'app/module/application/ApplicationModule',
        applicationConfig: 'app/module/application/config/config',
        applicationController: 'app/module/application/controller/applicationController',
        // application module
        authModule: 'app/module/auth/AuthModule',
        authConfig: 'app/module/auth/config/config',
        authController: 'app/module/auth/controller/authController',
        // home module
        homeModule: 'app/module/home/homeModule',
        homeConfig: 'app/module/home/config/config',
        homeController: 'app/module/home/controller/homeController',
        
        'angular-route': 'vendor/angular-route/angular-route',
        jquery: 'vendor/jquery/dist/jquery',
        restangular: 'vendor/restangular/dist/restangular',
        'ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        underscore: 'vendor/underscore/underscore',
        authManager: 'app/module/application/service/authManager',
        restManager: 'app/module/application/service/restManager',
        registerManager: 'app/module/application/service/registerManager',
        routeManager: 'app/module/application/service/routeManager',
        liveDirective: 'app/module/application/directive/live',
        //templates
        templates: 'build/app/templates'
    },
    shim: {
        angular: {exports: 'angular'},
        'templates': ['angular'],
        'angular-route': ['angular'],
        restangular: ['angular'],
        'ui-router': ['angular'],
        'applicationModule': ['angular'],
        'authModule': ['angular'],
        'homeModule': ['angular']
    },
    priority: [
        'angular'
    ],
    deps: ['bootstrap']
});