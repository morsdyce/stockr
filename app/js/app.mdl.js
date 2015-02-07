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
            });


        $urlRouterProvider.otherwise('/');
    }

})();