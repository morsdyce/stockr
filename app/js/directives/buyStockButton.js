(function () {
    'use strict';

    angular
        .module('stockr')
        .directive('stockButton', StockButton);

    StockButton.$inject = ['$window', '$mdDialog'];

    /* @ngInject */
    function StockButton($window, $mdDialog) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

            /**
             * Compromise: instead of making 1 template to share functionality
             * make 2 templates which are basically the same except labels and the
             * action command
             */

            if (attrs.stockButton === "buy") {
                element.on('click', function() {
                    $mdDialog.show({
                        templateUrl: 'views/_buyStockDialog.html',
                        controller: 'stockDialogController',
                        controllerAs: 'stockDialog',
                        locals: { stockSymbol: attrs.stockSymbol, stockPrice: attrs.stockPrice }
                    });
                });
            }

            if (attrs.stockButton === "sell") {
                element.on('click', function() {
                    $mdDialog.show({
                        templateUrl: 'views/_sellStockDialog.html',
                        controller: 'stockDialogController',
                        controllerAs: 'stockDialog',
                        locals: { stockSymbol: attrs.stockSymbol, stockPrice: attrs.stockPrice }
                    });
                });
            }

        }
    }
})();