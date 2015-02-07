(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['stockService', '$scope'];

    /* @ngInject */
    function dashboardController(stockService, $scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'dashboardController';
        vm.removeStock = removeStock;
        vm.addStock = addStock;
        vm.stocks = [];

        // set a fixed date since we're only previewing for yesterday.
        vm.yesterday = moment().subtract(1, 'days').format('MMM Do YYYY');

        activate();

        ////////////////

        function activate() {
            getStocks();
        }

        function getStocks() {
            stockService.getStocks().then(function(stocks) {
                console.log(stocks);
                vm.stocks = stocks;
                return vm.stocks;
            });
        }

        function removeStock(stockSymbol) {
            stockService.remove(stockSymbol);
            getStocks();
        }

        function addStock(stockSymbol) {
            stockService.add(stockSymbol);
            getStocks();
        }
    }
})();