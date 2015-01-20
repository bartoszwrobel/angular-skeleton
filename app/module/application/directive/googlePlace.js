'use strict';

define([], function() {
    function googlePlace(loadMap) {

//            var loadGooglePlaceApi = function($q, $rootScope) {
//                var defer = $q.defer();
//                require(['async!http://maps.google.com/maps/api/js?sensor=true&libraries=places,drawing'], function() {
//                    $rootScope.$apply(function() {
//                        defer.resolve();
//                    });
//                });
//                return defer.promise;
//            };

        return {
            restrict: 'E',
            replace: true,
            template: '<div><input class="form-control ac-control google-place-autocomplete" placeholder="{{placeholder}}" data-ng-model="googlePlacess"><div class="place-service-wrapper" style="display:none"></div></div>',
            scope: {
                ngModel: '=',
                onSelect: '&',
                title: '@',
                types: '@'
            },
            link: function($scope, element, attrs) {

                $scope.placeholder = 'Miejscowość, ulica, nr domu';
                if ($scope.title) {
                    $scope.placeholder = $scope.title;
                }

                loadMap.loadGoogle().then(function() {
                    var options = {}, autocomplete;
                    if ($scope.types) {
                        options.types = new Array($scope.types);
                    }

                    if (options.types === 'address')
                        autocomplete = new google.maps.places.Autocomplete((element.get(0)), options);
                    else
                        autocomplete = new google.maps.places.Autocomplete(element[0].getElementsByClassName('google-place-autocomplete')[0], options);

                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        $scope.getPlace();
                    });

                    $scope.getPlace = function() {
                        var elem = $(element).find('.google-place-autocomplete');
                        var place = autocomplete.getPlace();

                        if (typeof place.address_components === 'undefined') {
                            var autocompleteService = new google.maps.places.AutocompleteService();
                            autocompleteService.getPlacePredictions({
                                input: place.name,
                                offset: place.name.length,
                                componentRestrictions: options.componentRestrictions,
                                types: options.types
                            }, function(list) {
                                var placesService = new google.maps.places.PlacesService(element[0].getElementsByClassName('place-service-wrapper')[0]);
                                if (list) {
                                    if (list.length > 0) {
                                        placesService.getDetails({
                                            placeId: list[0].place_id
                                        }, function(details) {
                                            if ($scope.onSelect) {
                                                $scope.onSelect({place: details});
                                            }
                                            if ($scope.ngModel) {
                                                $scope.ngModel = details;
                                            }
                                            elem.blur();
                                            elem.val('');
                                            $scope.$apply();
                                        });
                                    }
                                }
                            });
                        }
                        if (place) {
                            if ($scope.onSelect) {
                                $scope.onSelect({place: place});
                            }
                            if ($scope.ngModel) {
                                $scope.ngModel = place;
                            }
                            elem.blur();
                            elem.val('');
                            $scope.$apply();
                        }
                    };

                    $(element[0].getElementsByClassName('google-place-autocomplete')[0]).on("keyup", function(e) {
                        if (e.keyCode === 13) {
                            $(autocomplete).trigger('place_changed');
                        }
                    });
                });

            }
        }
    }
    googlePlace.$inject = ['loadMap'];
    return googlePlace;
});
