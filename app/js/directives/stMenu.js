(function () {
    'use strict';

    angular
        .module('stockr')
        .directive('stMenu', stMenu)
        .controller('stMenuController', stMenuController);

    stMenuController.$inject = ['$mdDialog', '$location'];

    /* @ngInject */
    function stMenu() {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'views/stMenuDirective.html',
            controller: 'stMenuController',
            controllerAs: 'stMenu',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    function stMenuController($mdDialog, $location) {
        var vm = this;

        vm.openDialog = function(dialogName, $event) {

            if (dialogName === 'add') {
                $mdDialog.show({
                    targetEvent: $event,
                    templateUrl: 'views/_addDialog.html',
                    controller: 'addDialogController',
                    controllerAs: 'addDialog'
                });
            }

            if (dialogName === 'balance') {
                $mdDialog.show({
                    targetEvent: $event,
                    templateUrl: 'views/_balanceDialog.html',
                    controller: 'balanceDialogController',
                    controllerAs: 'balanceDialog'
                });
            }

            if (dialogName === 'news') {
                $location.url('news');
            }
        }

    }
})();