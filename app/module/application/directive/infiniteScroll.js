'use strict';

define(['jquery'], function ($) {
    function infiniteScroll() {
        return function (scope, element, attr) {
            var raw = element[0];

            $(element).on('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    if (attr.infiniteScrollDisabled !== 'true') {
                        scope.$apply(attr.infiniteScroll);
                    }
                }
            });
        };
    }

    return infiniteScroll;
});