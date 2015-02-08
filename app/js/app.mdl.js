(function() {

    "use strict";

    angular.module('stockr', [
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'ui.router'
    ]).config(['$stateProvider', '$urlRouterProvider', config]);


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardController as dashboard'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'views/news.html',
                controller: 'dashboardController as news'
            });


        $urlRouterProvider.otherwise('/');
    }

})();