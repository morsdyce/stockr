(function () {
    'use strict';

    angular
        .module('stockr')
        .controller('balanceDialogController', balanceDialogController);

    balanceDialogController.$inject = ['$mdDialog', 'balanceService'];

    /* @ngInject */
    function balanceDialogController($mdDialog, balanceService) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = 'balanceDialogController';
        vm.changeBalance = changeBalance;
        vm.closeDialog = closeDialog;

        ////////////////

        function changeBalance() {
            console.log(balanceService);
            balanceService[vm.action](vm.amount);
            closeDialog();
        }

        function closeDialog() {
            $mdDialog.hide();
        }
    }
})();