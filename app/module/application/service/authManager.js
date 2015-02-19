'use strict';
define([], function () {
    function authManager(restManager, $state, $timeout, $rootScope, $q) {

        var instance;
        if (instance) {
            return instance;
        }

        function AuthManager() {
        }

        AuthManager.prototype = {
            _user: null,
            _token: null,
            _permissions: null,
            setToken: function (token) {
                this._token = token;
            },
            getToken: function () {
                return this._token;
            },
            setPermissions: function (permissions) {
                this._permissions = permissions;
            },
            getPermissions: function () {
                return this._permissions;
            },
            setUser: function (user) {
                if (user === null) {
                    this._user = null;
                } else {
                    this._user = user;
                }
                $rootScope.loggedUser = this._user;
            },
            getUser: function () {
                return {role: "administrator"};
                return this._user;
            },
            isAuthorized: function (availableRoles) {
                var deferred = $q.defer();
                var user = this.getUser();
                if (user !== null && user.role && $rootScope.inArray(availableRoles, user.role) !== false) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
                return deferred.promise;
            },
            isLogged: function () {
                var deferred = $q.defer();

                deferred.resolve(); // delete this line when is-logged request start works
                if (this.getUser() !== null) {
                    deferred.resolve();
                } else {
                    restManager.customGet('is-logged').then(function (result) {
                        if (result.success) {
                            instance.setUser(result.identity);
                            $rootScope._isLogged = true;
                            deferred.resolve();
                        } else {
                            $timeout(function () {
                                deferred.reject();
                                $state.go('login');
                            });
                        }
                    });
                }
                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();
                restManager.customGet('logout').then(function (results) {
                    if (results.success) {
                        instance.setToken(null);
                        instance.setUser(null);
                        $rootScope._isLogged = false;
                        $rootScope.$broadcast('logout');

                        deferred.resolve(results);
                        $timeout(function () {
                            $state.go('login');
                        });
                    }
                });
                return deferred.promise;
            },
            login: function (login, password) {
                restManager.customPost('application/auth/login', 'login=' + login + '&password=' + password, '', {}, {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}).then(function (result) {
                    if (result.success && result.success === true) {
                        instance.setUser(result.token.identity);
                        instance.setToken(result.token)
                        return true;
                    }
                    return false;
                }, function () {
                    return false;
                });
            }
        };

        instance = new AuthManager();
        return instance;
    }

    authManager.$inject = ['restManager', '$state', '$timeout', '$rootScope', '$q'];

    return authManager;
});
