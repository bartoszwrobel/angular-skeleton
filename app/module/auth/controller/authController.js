'use strict';

define([], function () {

    function loginController($scope, authManager, $timeout) {

        $scope.data = {};

        $scope.loginAction = function () {
            $timeout(function () {
                authManager.login($scope.data.login, $scope.data.password);
            }, 100);
        };

    }
    loginController.$inject = ['$scope', 'authManager', '$timeout'];
    return loginController;
});
