(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('stockDialogController', stockDialogController);

    stockDialogController.$inject = ['balanceService', '$mdDialog', 'stockSymbol', 'stockPrice'];

    /* @ngInject */
    function stockDialogController(balanceService, $mdDialog, stockSymbol, stockPrice) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = 'stockDialogController';
        vm.buyStock = buyStock;
        vm.sellStock = sellStock;
        vm.closeDialog = closeDialog;

        ////////////////

        function buyStock() {
            // compromise: assume we always have balance or we get can go overdraft
            balanceService.removeBalance(stockPrice * vm.amount);
            balanceService.addShare(stockSymbol, vm.amount);
            closeDialog();
        }

        function sellStock() {
            // compromise: assume we always have balance or we get can go overdraft
            balanceService.addBalance(stockPrice * vm.amount);
            balanceService.removeShare(stockSymbol, vm.amount);
            closeDialog();
        }

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();