(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('addDialogController', addDialogController);

    addDialogController.$inject = ['stockService', '$mdDialog'];

    /* @ngInject */
    function addDialogController(stockService, $mdDialog) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = 'addDialogController';

        vm.addStock = addStock;
        vm.closeDialog = closeDialog;


        ////////////////

        function addStock() {
            stockService.add(vm.stock);
            stockService.getStocks();
            vm.stock = '';
        }

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();