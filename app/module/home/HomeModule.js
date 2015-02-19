define([
    'angular',
    'homeConfig',
    'homeController'
],
        function (angular, config, homeController) {
            'use strict';
            var home = angular.module('homeModule', []);

            home.config(config);
            home.controller('homeController', homeController);
        });