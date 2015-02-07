(function () {
    'use strict';

    angular
        .module('stockr')
        .factory('stockService', stockService);

    stockService.$inject = ['$q', '$http', 'settingsService'];

    /* @ngInject */
    function stockService($q, $http, settingsService) {


        var service = {
            getStocks: getStocks,
            add: add,
            remove: remove,
            get: get
        };

        /**
         * Stock provider URL
         */
        var serviceUrl = 'http://query.yahooapis.com/v1/public/yql';

        /**
         * Default stocks for demo purposes
         */
        var stockSymbols = ['AAPL', 'YHOO', 'GOOG', 'MSFT'];

        activate();

        return service;

        ////////////////

        function get() {
            return stockSymbols;
        }

        function add(stockSymbol) {
            stockSymbols.push(stockSymbol);
            settingsService.set('stockSymbols', JSON.stringify(stockSymbols));
        }

        function remove(stockSymbol) {
            stockSymbols.splice(stockSymbols.indexOf(stockSymbol), 1);
            settingsService.set('stockSymbols', JSON.stringify(stockSymbols));
        }

        function getStocks() {
            var defer = $q.defer();

            $http.get(buildQuery(stockSymbols))
                .then(function(result) {
                    if (result.status === 200) {
                        defer.resolve(processData(result.data));
                    } else {
                        defer.reject('request to YQL failed');
                    }
                }, function(error) {
                    defer.reject(error);
                });


            return defer.promise;
        }

        function processData(data) {
            if (!data) {
                return;
            }

            return data.query.results.quote.map(function(item) {
               return {
                   change: item.Change,
                   changeInPercent: item.ChangeinPercent,
                   stockExchange: item.StockExchange,
                   symbol: item.Symbol,
                   name: item.Name,
                   lastTradeTime: item.LastTradeTime,
                   price: item.LastTradePriceOnly
               }
            });
        }

        /**
         * Build a query to get stock quotes from YQL
         * Compromise: a hacky way to get the correct syntax out of an array for yql
         * @param symbols - an array of stock symbols
         * @returns {string}
         */
        function buildQuery(symbols) {
            symbols = JSON.stringify(symbols).replace(/\[|]/g, '');
            return serviceUrl + '?q=' + encodeURIComponent('select * from yahoo.finance.quotes where symbol in (' + symbols + ')') + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        }

        /**
         * check settings for saved stocks
         */
        function activate() {
            settingsService.get('stockSymbols').then(function(stocks) {
                if (stocks) {
                    stockSymbols = JSON.parse(stocks);
                }
            });
        }
    }
})();