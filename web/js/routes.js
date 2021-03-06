(function() {
    'use strict';
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('body', {
                    templateUrl: "views/body.html",
                    controller: function($scope, $rootScope, $state) {
                        $rootScope.state = $state;
                    }
                })
                .state('body.main', {
                    url: "/",
                    views: {
                        "main": {
                            templateUrl: "views/article/main.html",
                            controller: 'articleController',
                            controllerAs: 'ctr',
                            resolve: {
                                articles: ['articleService', function(articleService) {
                                    return articleService.all();
                                }],
                                article: function() { return {}; }
                            }
                        }
                    }
                })
                .state('body.article', {
                    url: "/article/:id",
                    views: {
                        "main": {
                            templateUrl: "views/article/view.html",
                            controller: 'articleController',
                            controllerAs: 'ctr',
                            resolve: {
                                articles: function() { return {}; },
                                article: ['$stateParams','articleService', function($stateParams, articleService) {
                                    return articleService.get($stateParams.id);
                                }]
                            }
                        }
                    }
                })
        }]);
})();