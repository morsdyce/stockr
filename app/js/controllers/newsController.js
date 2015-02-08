(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('newsController', newsController);

    newsController.$inject = ['stockService', 'balanceService'];

    /* @ngInject */
    function newsController(stockService, balanceService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'newsController';
        vm.finance = balanceService.data;
        vm.totalShares = balanceService.getTotalShares;

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
    }
})();