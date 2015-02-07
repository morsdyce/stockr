(function() {
    'use strict';

    describe('Settings Service', function() {

        var _stockService, _rootScope;

        beforeEach(module('stockr'));
        beforeEach(inject(function(stockService, $rootScope) {
            _stockService = stockService;
            _rootScope = $rootScope;
        }));

        it('should add a stock', function() {

            _stockService.add('MSI');

            expect(_stockService.get()).toContain('MSI');

        });

        it ('should remove a stock', function() {

            _stockService.remove('AAPL');

            expect(_stockService.get()).not.toContain('AAPL');
        });

    });

})();
