'use strict';

require(['angular'], function (angular) {

    var services = angular.module('registerManagerModule', []);

    services.provider('registerManager', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        this.$get = function () {
            return this;
        };

        this.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
    });

});