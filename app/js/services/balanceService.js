(function () {
    'use strict';

    angular
        .module('stockr')
        .factory('balanceService', balanceService);

    balanceService.$inject = ['settingsService', 'stockService', '$q'];

    /* @ngInject */
    function balanceService(settingsService, stockService, $q) {

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
            getStockShares: getStockShares,
            getBalance: getBalance,
            getNetWorth: getNetWorth,
            data: data
        };

        activate();

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

            if (!angular.isNumber(amount)) {
                amount = parseFloat(amount);
            }

            var stock = getStock(symbol);

            if (stock) {
                stock.shares += amount;
            } else {
                data.stocks.push({
                   symbol: symbol,
                   shares: amount
                });
            }
            save();
        }

        function removeShare(symbol, amount) {

            if (!angular.isNumber(amount)) {
                amount = parseFloat(amount);
            }

            var stock = getStock(symbol);

            if (stock) {
                stock.shares -= amount;

                if (stock.shares < 0) {
                    stock.shares = 0;
                }
            }
            save();
        }

        function getTotalShares() {
            return data.stocks.map(function(item) {
                return item.shares;
            }).reduce(function(x, y) {
                return x + y;
            }, 0);
        }

        function getStockShares(symbol) {
            var stock = getStock(symbol);

            if (stock) {
                return stock.shares;
            }

            return 0;
        }

        function getBalance() {
            return data.balance;
        }

        function getNetWorth() {

            var defer = $q.defer();

            stockService.getStocks().then(function(stocks) {
                var amount = stocks.map(function(stockData) {
                   var stock = getStock(stockData.symbol);
                    if (stock) {
                        return stock.shares * stockData.price;
                    }
                    return 0;
                }).reduce(function(x, y) {
                    return x + y;
                });
                defer.resolve(amount);
            }, function(error) {
                defer.reject(error);
            });

            return defer.promise;
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
                if (result) {
                    data = JSON.parse(result);
                }
            });
        }
    }
})();