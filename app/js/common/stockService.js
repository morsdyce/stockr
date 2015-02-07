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
        }

        function remove(stockSymbol) {
            stockSymbols.splice(stockSymbols.indexOf(stockSymbol), 1);
        }

        function getStocks(startDate, endDate) {
            var defer = $q.defer();

            console.log(stockSymbols);
            $http.get(buildQuery(stockSymbols, startDate, endDate))
                .then(function(result) {
                    console.log(result.data);
                    if (result.status === 200) {
                        defer.resolve(result.data);
                    } else {
                        defer.reject('request to YQL failed');
                    }
                }, function(error) {
                    defer.reject(error);
                });


            return defer.promise;
        }

        /**
         * Build a query to get stock quotes from YQL
         * @param symbols - an array of stock symbols
         * @param startDate - start date in the following format: yyyy-mm-dd
         * @param endDate - end date in the following format: yyyy-mm-dd
         * @returns {string}
         */
        function buildQuery(symbols, startDate, endDate) {
            return serviceUrl + '?q=' + encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in (' + symbols.join(',') + ') and startDate = "' + startDate + '" and endDate = "' + endDate + '"') + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
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