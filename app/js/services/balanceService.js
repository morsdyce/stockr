(function () {
    'use strict';

    angular
        .module('stockr')
        .factory('balanceService', balanceService);

    balanceService.$inject = ['settingsService'];

    /* @ngInject */
    function balanceService(settingsService) {

        var data = {
            balance: 0,
            stocks: []
        };

        var service = {
            addBalance: addBalance,
            removeBalance: removeBalance,
            addShare: addShare,
            removeShare: removeShare,
            getTotalShares: getTotalShares,
            data: data
        };

        return service;

        ////////////////

        function addBalance(amount) {

            if (!angular.isNumber(amount)) {
                amount = parseFloat(amount);
            }

            data.balance += amount;
            save();
        }

        function removeBalance(amount) {
            addBalance(-amount);
        }

        function addShare(symbol, amount) {
            var stock = getStock();

            if (stock ) {
                stock.shares += amount;
            } else {
                data.stocks.push({
                   symbol: symbol,
                   shares: amount
                });
            }
        }

        function removeShare(symbol, amount) {
            var stock = getStock(symbol);

            if (stock) {
                stock.shares -= amount;

                if (stock.shares < 0) {
                    stock.shares = 0;
                }
            }
        }

        function getTotalShares() {
            return data.stocks.map(function(item) {
                return item.shares;
            }).reduce(function(x, y) {
                return x + y;
            }, 0);
        }

        function getStock(symbol) {
            var stock = data.stocks.filter(function(item) {
               return item.symbol === symbol;
            });

            if (stock.length > 0) {
                return stock[0];
            }

            return null;
        }

        function save() {
            settingsService.set('balance', JSON.stringify(data));
        }

        function activate() {
            settingsService.get('balance').then(function(result) {
               data = JSON.parse(result);
            });
        }
    }
})();