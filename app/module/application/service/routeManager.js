'use strict';

define(['angular'], function (angular) {

    var services = angular.module('routeManagerModule', []);

    var getDependencies = function (module) {

        var defaultDependencies = [
        ];

        switch (module) {
            case 'auth':
                return [];
        }
    };

    services.provider('routeManager', function () {
        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var rootDirectory = 'app/module',
                    setRootDirectory = function (root) {
                        rootDirectory = root;
                    },
                    getRootDirectory = function () {
                        return rootDirectory;
                    };

            return {
                setRootDirectory: setRootDirectory,
                getRootDirectory: getRootDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (url, baseName, module, detailsView) {
                if (module === undefined) {
                    module = baseName;
                }

                var routeDef = {};

                if (detailsView === true) {
                    routeDef.views = {
                        'details': {
                            templateUrl: routeConfig.getRootDirectory() + '/' + module + '/view/templates/' + baseName + '.html?_dc=' + (new Date()).getTime(),
                            controller: baseName + 'Controller'
                        }
                    }
                } else {
                    routeDef.views = {
                        content: {
                            templateUrl: routeConfig.getRootDirectory() + '/' + module + '/view/templates/' + baseName + '.html?_dc=' + (new Date()).getTime(),
                            controller: baseName + 'Controller'
                        }
                    };
                }
                routeDef.url = url;
                routeDef.module = module;
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                            var dependencies = [routeConfig.getRootDirectory() + '/' + module + '/controller/' + baseName + 'Controller.js'];
                            var otherDependencies = getDependencies(module);
                            if (otherDependencies.length > 0) {
                                dependencies = dependencies.concat(otherDependencies);
                            }
                            return resolveDependencies($q, $rootScope, dependencies);
                        }]
                };

                if (module !== 'auth') {
                    routeDef.resolve.isLogged = ['authManager', function (authManager) {
                            return authManager.isLogged();
                        }];
                }

                return routeDef;
            };

            var resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            }
        }(this.routeConfig);
    });

});
