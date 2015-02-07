(function() {

    'use strict';

    angular.module('stockr')
        .config(['$stateProvider', '$urlRouterProvider', config]);


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/dashboard.html'
            });


        $urlRouterProvider.otherwise('/');
    }

})();