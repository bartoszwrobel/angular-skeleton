'use strict'; 
define([], function () {
    function authManager(restManager, $state, $timeout, $rootScope, aclManager, $q) {

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
                $rootScope.$broadcast('tokenChange', token);
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
                if (user == null) {
                    this._user = null;
                } else {
                    this._user = {
                        id: user.id,
                        name: user.name,
                        isAdmin: user.hasOwnProperty('isAdmin') ? user.isAdmin : false,
                        activeGroup: user.hasOwnProperty('activeGroup') ? user.activeGroup : '',
                        avatar: user.avatar ? user.avatar : null
                    };
                }
                $rootScope.loggedUser = this._user;
                aclManager._user = user;
            },
            getUser: function () {
                return this._user;
            },
            isLogged: function () {
                var deferred = $q.defer();
                if (this.getUser() !== null) {
                    deferred.resolve();
                } else {
                    restManager.customGet('is-logged').then(function (result) {
                        if (result.success) {
                            instance.setUser(result.user);
                            aclManager.setPermissions(result.user.permissions);
                            aclManager.makeAvailableModules();
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

                        deferred.resolve(results.documents);
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
                        instance.setUser(result.user);
                        aclManager.setPermissions(result.user.permissions);
                        return true;
                    }
                    return false;
                }, function () {
                    return false;
                });
            }
        };

        $rootScope.$on('logout401', function () {
            instance.logout();
        });

        instance = new AuthManager();
        return instance;
    }

    authManager.$inject = ['restManager', '$state', '$timeout', '$rootScope', 'aclManager', '$q'];

    return authManager;
});
