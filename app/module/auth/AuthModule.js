define([
    'angular',
    'authConfig',
    'authController'
],
        function (angular, config, authController) {
            'use strict';

            var auth = angular.module('authModule', []);

            auth.config(config);
            auth.controller('authController', authController);
        });