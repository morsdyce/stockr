(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['stockService', 'balanceService', '$scope'];

    /* @ngInject */
    function dashboardController(stockService, balanceService, $scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'dashboardController';
        vm.removeStock = removeStock;
        vm.addStock = addStock;
        vm.stocks = [];
        vm.netWorth = 0;
        vm.finance = balanceService.data;
        vm.getBalance = balanceService.getBalance;
        vm.totalShares = balanceService.getTotalShares;
        vm.getStockShares = balanceService.getStockShares;

        // set a fixed date since we're only previewing for yesterday.
        vm.yesterday = moment().subtract(1, 'days').format('MMM Do YYYY');

        activate();

        ////////////////

        function activate() {
            getStocks();
            watchBalanceAndShares();
            updateNetWorth();
        }

        function getStocks() {
            stockService.getStocks().then(function (stocks) {
                console.log(vm.stocks);
                vm.stocks = stocks;
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

        /*
         *   Compromise: Assume whenever balance is changed net worth should be changed as well
         *   Normally I would set up proper bindings to propagate the changes
         */
        function watchBalanceAndShares() {
            $scope.$watch(function () {
                return vm.getBalance();
            }, function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                updateNetWorth();
            });
        }

        function updateNetWorth() {
            balanceService.getNetWorth().then(function (result) {
                vm.netWorth = result;
            });
        }
    }
})();