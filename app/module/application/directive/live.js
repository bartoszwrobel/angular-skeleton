'use strict';
define(['jquery'], function($) {
    function live($timeout, $rootScope) {

        var bindWidget = function(className, element, options, attrs) {
            className = className.trim();
            switch (className) {
                case 'selectpicker':
                    $(element).selectpicker();
                    break;
                case 'dlmenu':
                    $(element).dlmenu({
                        animationClasses: {classin: 'dl-animate-in-2', classout: 'dl-animate-out-2'}
                    });
                    break;
                case 'with-tooltip':
                    $(element).tooltip({
                        container: 'body',
                        placement: 'bottom'
                    });
                    break;
                case 'fullcalendar':
                    $(element).fullCalendar(options.fullcalendar ? options.fullcalendar : {});
                    break;
                case 'scroll-it':
                    $timeout(function() {
                        var subtraction = $('.page-header').outerHeight() + $('.page-header-bar').outerHeight();

                        if (!subtraction) {
                            subtraction = 112;
                        }

                        $(element).css('height', $(window).height() - (subtraction) + 'px');
                        $(window).resize(function() {
                            $(element).css('height', $(window).height() - (subtraction) + 'px');
                        });
                    });
                    break;
                case 'column':
                    $(".column").sortable({
                        connectWith: ".column",
                        handle: ".panel-heading",
                        cancel: ".portlet-toggle",
                        placeholder: "portlet-placeholder ui-corner-all",
                    });
                    break;
                case 'draggable':
                    element.draggable({
                        zIndex: 999,
                        scroll: false,
                        helper: 'clone',
                        cursor: 'move',
                        appendTo: 'body',
                        revert: true, // will cause the event to go back to its
                        revertDuration: 0  //  original position after the drag
                    });
                    break;
                case 'easyPieChart':
                    $(element).easyPieChart(options.easyPieChart ? options.easyPieChart : {});
                    $(element[0]).data('easyPieChart').update(attrs.percent);
                    break;
                case 'scroll-pane':
                    $(element).jScrollPane({
                        mouseWheelSpeed: 30,
                        contentWidth: '0px'
                    });
                    break;
                case 'tab-drop':
                    $('.tab-drop').tabdrop();
                    break;
                case 'sortable':
                    $(element).sortable({
                        cursor: 'move',
                        placeholder: "ui-state-highlight"
                    });
                    $(element).on('sortupdate', function(event, ui) {
                        var arr = $(element).sortable("toArray");
                        $rootScope.$broadcast('sortable', arr);
                    });
                    break;
            }
        };
        var linker = function(scope, element, attrs) {
            if (attrs.class) {
                var classes = attrs.class.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    bindWidget(classes[i], element, scope.widgetOptions, attrs);
                }
            }
        };
        return {
            scope: {
                widgetOptions: '='
            },
            restrict: 'A',
            link: linker
        };
    }
    live.$inject = ['$timeout', '$rootScope'];
    return live;
});
