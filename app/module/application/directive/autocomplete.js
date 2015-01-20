'use strict';

define(['angular'], function(angular) {

    function autocomplete(restManager, $filter) {
        return {
            restrict: 'E',
            require: '?ngModel',
            template: '<div class="ac-form-control"><input type="text" typeahead-on-select="selectItem($item, $model, $label)" ng-model="item" typeahead-min-length="3" typeahead-wait-ms="400" typeahead="item.name for item in searchItem($viewValue)" class="form-control" ng-model-options="{debounce:{default:400}}" placeholder="{{placeholder}}"><loader data-show-loader="loader" data-type="small"></loader></div>',
            scope: {
                onSelect: '@',
                content: '@',
                clear: '@',
                placeholder: '@',
                ngModel: '=',
                user: '=',
                additional: '@'
            },
            link: function(scope, element, attrs) {
                scope.$evalAsync(function() {
                    if (!scope.placeholder) {
                        scope.placeholder = 'Wyszukaj';
                    }
                });

                if (attrs.ngModel && attrs.ngModel !== '') {
                    var ngModelWatcher = scope.$watch('ngModel', function(newVal) {
                        if (newVal !== undefined && typeof (newVal) === 'object') {
                            scope.item = newVal;
                            ngModelWatcher();
                        }
                    });
                }

                scope.searchItem = function(val) {
                    if (scope.content && scope.content !== '') {
                        var items = [];
                        scope.loader = true;
                        switch (scope.content) {
                            case 'user':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,position,avatar,active,email',
                                    active: true
                                };
                                return restManager.getList('employee/employee', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'company':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,avatar,active,addresses,related,email',
                                    active: true
                                };
                                return restManager.getList('company/company', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            if (item.addresses && item.addresses instanceof Array && item.addresses.length > 0) {
                                                var formattedAddress, mainAddress;

                                                angular.forEach(item.addresses, function(address) {
                                                    if (address.type === 4) {
                                                        mainAddress = address;
                                                    }
                                                });

                                                if (mainAddress) {
                                                    if (mainAddress.locality) {
                                                        formattedAddress = mainAddress.locality;
                                                        if (mainAddress.route) {
                                                            formattedAddress = formattedAddress + ', ' + mainAddress.route;
                                                        }

                                                    }
                                                } else if (item.addresses[0]) {
                                                    if (item.addresses[0].locality) {
                                                        formattedAddress = item.addresses[0].locality;
                                                        if (item.addresses[0].route) {
                                                            formattedAddress = formattedAddress + ', ' + item.addresses[0].route;
                                                        }
                                                    }
                                                }

                                                if (formattedAddress) {
                                                    item.name = item.name + ' - ' + formattedAddress;
                                                }
                                            }
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'agent':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,avatar,active,addresses,related,email',
                                    active: true,
                                    agent: true
                                };
                                return restManager.getList('company/company', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            if (item.addresses && item.addresses instanceof Array && item.addresses.length > 0) {
                                                var formattedAddress, mainAddress;

                                                angular.forEach(item.addresses, function(address) {
                                                    if (address.type === 4) {
                                                        mainAddress = address;
                                                    }
                                                });

                                                if (mainAddress) {
                                                    if (mainAddress.locality) {
                                                        formattedAddress = mainAddress.locality;
                                                        if (mainAddress.route) {
                                                            formattedAddress = formattedAddress + ', ' + mainAddress.route;
                                                        }

                                                    }
                                                } else if (item.addresses[0]) {
                                                    if (item.addresses[0].locality) {
                                                        formattedAddress = item.addresses[0].locality;
                                                        if (item.addresses[0].route) {
                                                            formattedAddress = formattedAddress + ', ' + item.addresses[0].route;
                                                        }
                                                    }
                                                }

                                                if (formattedAddress) {
                                                    item.name = item.name + ' - ' + formattedAddress;
                                                }
                                            }
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'variant':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,variants,tax,active,description',
                                    active: true
                                };
                                return restManager.getList('product/product', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            angular.forEach(item.variants, function(variant) {
                                                variant.name = $filter('defaultLang')(item.name) + " - " + $filter('defaultLang')(variant.name) + " / " + $filter('number', 2)(variant.price) + " PLN";
                                                variant.priceFormatted = $filter('parsePrice')(variant.price);
                                                variant.tax = item.tax;
                                                items.push(variant);
                                            });
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'product':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,variants,tax,active,description',
                                    active: true
                                };
                                return restManager.getList('product/product', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            item.name = $filter('defaultLang')(item.name);
                                            if (item.hasOwnProperty('price')) {
                                                item.priceFormatted = $filter('parsePrice')(item.price);
                                            }
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'statistic':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name'
                                };
                                return restManager.getList('statistic/statistic', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'region':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name'
                                };
                                return restManager.getList('territory/region', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            item.name = $filter('defaultLang')(item.name);
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'region-details':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,polygons',
                                    additional: scope.additional
                                };
                                return restManager.getList('territory/region', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            item.name = $filter('defaultLang')(item.name);
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });
                                break;
                            case 'resource':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    fieldsQuery: 'id,name,serial'
                                };
                                return restManager.getList('resource/resource', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            item.name = $filter('defaultLang')(item.name);
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });

                                break;
                            case 'program':
//                                @TODO language !
                                var params = {
                                    limit: 25,
                                    'name.pl[like]': val
                                };

                                if (scope.user) {
                                    params = angular.extend(params, {user: scope.user});
                                }

                                return restManager.getList('loyaltyprogram/loyaltyprogram', params).then(function(results) {
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            item.name = $filter('defaultLang')(item.name);
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;
                                });

                                break;
                            case 'order':
                                var params = {
                                    limit: 20,
                                    query: val,
                                    'sort[createdAt]': 'desc',
                                    fieldsQuery: 'number,createdAt,customer.name,contractor.name,agent.name,recipient.name,products,priceNetto',
                                };
                                return restManager.getList('order/order', params).then(function(results) {
//                                    console.log(results.documents)
                                    if (results.documents) {
                                        angular.forEach(results.documents, function(item) {
                                            var date = new Date(item.createdAt * 1000)
                                            item.name = item.recipient.name + " " + date + " " + item.contractor.name + " " + item.priceNetto;
                                            items.push(item);
                                        });
                                    }
                                    scope.loader = false;
                                    return items;

                                });
                                break;

                        }
                        return items;
                    }
                };

                scope.selectItem = function(item, model, label) {
                    if (attrs.ngModel && attrs.ngModel !== '') {
                        scope.ngModel = item;
                    }
                    if (scope.$parent['selectItem'] !== undefined && !scope.onSelect) {
                        scope.$parent['selectItem'](item, model, label);
                    } else if (scope.onSelect && scope.onSelect !== '') {
                        if (scope.$parent.$eval(scope.onSelect) !== undefined) {
                            scope.$parent.$eval(scope.onSelect)(item, model, label, element);
                        }
                    }

                    if (attrs.hasOwnProperty('clear')) {
//                        console.log(label);
                        scope.item = '';
                        label = '';
                    }
                };
            }
        };
    }
    
    autocomplete.$inject = ['restManager', '$filter'];
    return autocomplete;
});
