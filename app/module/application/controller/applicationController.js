'use strict';

define(['jquery'], function ($) {
    
    function applicationController($rootScope, $scope, authManager) {

        $rootScope.preventDefault = function ($event) {
            $event.preventDefault();
        };
        $rootScope.stopPropagation = function ($event) {
            $event.stopPropagation();
        };

        $rootScope.showNotification = function (type, text, duration, position) {
            if (duration === undefined) {
                duration = 3000;
            }
            if (position === undefined) {
                position = 'top-right';
            }
//            $('#notification').addClass(position).notify({
//                type: type,
//                message: {text: text},
//                fadeOut: {delay: duration}
//            }).show();
        };

        $rootScope.inArray = function (array, value, key) {
            var path, i;
            for (i = 0; i < array.length; i++) {
                path = array[i];

                if (key !== undefined) {
                    path = array[i][key];
                }
                if (path == value) {
                    return i;
                }
            }
            return false;
        };

        $rootScope.removeFromArray = function (array, value, key) {
            var path, i;
            for (i = 0; i < array.length; i++) {
                path = array[i];
                if (key !== undefined) {
                    path = array[i][key];
                }
                if (path == value) {
                    array.splice(i, 1);
                    break;
                }
            }
        };

        $scope.logout = function () {
            authManager.logout();
        };

    }
    applicationController.$inject = ['$rootScope', '$scope', 'authManager'];
    return applicationController;
});
