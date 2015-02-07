(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['stockService'];

    /* @ngInject */
    function dashboardController(stockService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'dashboardController';

        activate();

        ////////////////

        function activate() {

            // set a fixed date since we're only previewing for yesterday.
            vm.yesterday = moment().subtract(1, 'days').format('MMM Do YYYY');

            stockService.getStocks().then(function(data) {
               vm.stocks = data;
            });
        }
    }
})();