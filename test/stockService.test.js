(function() {
    'use strict';

    describe('Stock Service', function() {

        var _stockService, _rootScope, _httpBackend;

        beforeEach(module('stockr'));
        beforeEach(inject(function(stockService, $rootScope, $httpBackend) {
            _stockService = stockService;
            _rootScope = $rootScope;
            _httpBackend = $httpBackend;

        }));

        it('should add a stock', function() {

            _stockService.add('MSI');

            expect(_stockService.get()).toContain('MSI');

        });

        it('should remove a stock', function() {

            _stockService.remove('AAPL');

            expect(_stockService.get()).not.toContain('AAPL');
        });

        it('should map the relevant data after fetch', function() {

            var response = '{"query":{"count":4,"created":"2015-02-07T22:07:02Z","lang":"en-US","results":{"quote":[{"symbol":"AAPL","Ask":"121.00","AverageDailyVolume":"53276700","Bid":null,"AskRealtime":"121.00","BidRealtime":"0.00","BookValue":"21.167","Change_PercentChange":"-1.01 - -0.84%","Change":"-1.01","Commission":null,"Currency":"USD","ChangeRealtime":"-1.01","AfterHoursChangeRealtime":"N/A - N/A","DividendShare":"1.88","LastTradeDate":"2/6/2015","TradeDate":null,"EarningsShare":"7.385","ErrorIndicationreturnedforsymbolchangedinvalid":null,"EPSEstimateCurrentYear":"8.57","EPSEstimateNextYear":"9.14","EPSEstimateNextQuarter":"1.65","DaysLow":"118.45","DaysHigh":"120.25","YearLow":"73.0471","YearHigh":"120.51","HoldingsGainPercent":"- - -","AnnualizedGain":null,"HoldingsGain":null,"HoldingsGainPercentRealtime":"N/A - N/A","HoldingsGainRealtime":null,"MoreInfo":"cnsprmiIed","OrderBookRealtime":null,"MarketCapitalization":"692.7B","MarketCapRealtime":null,"EBITDA":"67.663B","ChangeFromYearLow":"+45.8829","PercentChangeFromYearLow":"+62.81%","LastTradeRealtimeWithTime":"N/A - <b>118.93</b>","ChangePercentRealtime":"N/A - -0.84%","ChangeFromYearHigh":"-1.58","PercebtChangeFromYearHigh":"-1.31%","LastTradeWithTime":"Feb  6 - <b>118.93</b>","LastTradePriceOnly":"118.93","HighLimit":null,"LowLimit":null,"DaysRange":"118.45 - 120.25","DaysRangeRealtime":"N/A - N/A","FiftydayMovingAverage":"112.382","TwoHundreddayMovingAverage":"105.968","ChangeFromTwoHundreddayMovingAverage":"+12.962","PercentChangeFromTwoHundreddayMovingAverage":"+12.23%","ChangeFromFiftydayMovingAverage":"+6.548","PercentChangeFromFiftydayMovingAverage":"+5.83%","Name":"Apple Inc.","Notes":null,"Open":"120.10","PreviousClose":"119.94","PricePaid":null,"ChangeinPercent":"-0.84%","PriceSales":"3.50","PriceBook":"5.67","ExDividendDate":"Feb  5","PERatio":"16.24","DividendPayDate":"Feb 12","PERatioRealtime":null,"PEGRatio":"1.09","PriceEPSEstimateCurrentYear":"14.00","PriceEPSEstimateNextYear":"13.12","Symbol":"AAPL","SharesOwned":null,"ShortRatio":"1.20","LastTradeTime":"4:00pm","TickerTrend":"&nbsp;======&nbsp;","OneyrTargetPrice":"131.20","Volume":"43706568","HoldingsValue":null,"HoldingsValueRealtime":null,"YearRange":"73.0471 - 120.51","DaysValueChange":"- - -0.84%","DaysValueChangeRealtime":"N/A - N/A","StockExchange":"NasdaqNM","DividendYield":"1.57","PercentChange":"-0.84%"}]}}}';

            _httpBackend.when('GET', function(url) {
                if (url.indexOf('query.yahooapis.com') > -1) {
                    return true;
                }
                return false;
            }).respond(response);

            var data;
            _stockService.getStocks().then(function(result) {
                data = result[0];
            });

            expect(data).toBeUndefined();

            _httpBackend.flush();



            expect(data.name).not.toBeUndefined();
            expect(data.price).not.toBeUndefined();
            expect(data.stockExchange).not.toBeUndefined();
            expect(data.change).not.toBeUndefined();
            expect(data.changeInPercent).not.toBeUndefined();
            expect(data.lastTradeTime).not.toBeUndefined();
            expect(data.price).not.toBeUndefined();
            expect(data.symbol).not.toBeUndefined();

            // check that we do not have a field we did not need
            expect(data.Ask).toBeUndefined();

        });

    });

})();
