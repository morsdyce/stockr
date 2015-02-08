(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['stockService', 'balanceService'];

    /* @ngInject */
    function dashboardController(stockService, balanceService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'dashboardController';
        vm.removeStock = removeStock;
        vm.addStock = addStock;
        vm.stocks = [];
        vm.finance = balanceService.data;
        vm.totalShares = balanceService.getTotalShares;
        vm.getStockShares = balanceService.getStockShares;

        // set a fixed date since we're only previewing for yesterday.
        vm.yesterday = moment().subtract(1, 'days').format('MMM Do YYYY');

        activate();

        ////////////////

        function activate() {
            getStocks();
        }

        function getStocks() {
            stockService.getStocks().then(function(stocks) {
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