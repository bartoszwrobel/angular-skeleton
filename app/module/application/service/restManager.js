'use strict'; 

define([], function () {
    function restManager(Restangular, $q, $location, $rootScope, $timeout) {
        var instance, abort;
        if (instance) {
            return instance;
        }

        function RestManager() {
        }

        RestManager.prototype = {
            get: function (route, id) {
                return Restangular.one(route, id).get();
            },
            customGet: function (route, params) {
                return Restangular.one(route).customGET('', params);
            },
            getList: function (route, params, withAbort) {
                if (params === undefined) {
                    params = {};
                }
                if (withAbort === undefined) {
                    withAbort = false;
                }
                if (abort) {
                    abort.resolve();
                }
                abort = $q.defer();
                if (withAbort) {
                    return Restangular.one(route).withHttpConfig({timeout: abort.promise}).customGET('', params);
                }
                return Restangular.one(route).customGET('', params);
            },
            update: function (route, id, params) {
                return Restangular.one(route, id).customPUT(params, '', {}, {});
            },
            create: function (route, object) {
                return Restangular.all(route).post(object);
            },
            delete: function (route, id) {
                return Restangular.one(route, id).remove();
            },
            customPost: function (route, data, path, params, headers, withAbort) {
                if (withAbort === undefined) {
                    withAbort = false;
                }
                if (abort) {
                    abort.resolve();
                }
                abort = $q.defer();
                path = path || '';
                params = params || {};
                headers = headers || undefined;

                if (withAbort) {
                    return Restangular.one(route).withHttpConfig({timeout: abort.promise}).customPOST(data, '', {}, headers);
                }
                return Restangular.one(route).customPOST(data, '', {}, headers);
            },
            addResponseInterceptor: function (method) {
                Restangular.addResponseInterceptor(method);
            }
        };

        instance = new RestManager();

        Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {


            if (response.status === 0) {
                $rootScope.showNotification('warning', 'Connection lost');
            }

            if (response.status === 401) {
                instance.getList('application/auth/isLogged').then(function (result) {
                    if (result.success && result.success === true) {
                        $timeout(function () {
                            $location.state('home');
                        });
                    } else {
                        $timeout(function () {
                            $location.state('login');
                        });
                    }
                });
            }
            if (response.status === 403) {
                $rootScope.showNotification('warning', 'No permissions!');
            }
            return response;
        });

        return instance;
    }

    restManager.$inject = ['Restangular', '$q', '$location', '$rootScope', '$timeout'];

    return restManager;
});
