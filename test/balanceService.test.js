(function() {
    'use strict';

    describe('Balance Service', function() {

        var _balanceService, _rootScope;

        beforeEach(module('stockr'));
        beforeEach(inject(function(balanceService) {
            _balanceService = balanceService;
            _balanceService.data.balance = 0;
            _balanceService.data.stocks = [];
        }));

        it('should add balance', function() {

            expect(_balanceService.data.balance).toEqual(0);

            _balanceService.addBalance(5000);

            expect(_balanceService.data.balance).toEqual(5000);

        });

        it('should remove balance', function() {

            expect(_balanceService.data.balance).toEqual(0);

            _balanceService.removeBalance(5000);

            expect(_balanceService.data.balance).toEqual(-5000);
        });

        it('should add shares', function() {

            _balanceService.addShare('APPL', 50);

            var stock = _balanceService.data.stocks.filter(function(item) {
               return item.symbol === 'APPL';
            });

            expect(stock[0].symbol).toEqual('APPL');
            expect(stock[0].shares).toEqual(50);
        });

        it('should remove shares', function() {

            _balanceService.addShare('APPL', 25);

            var stock = _balanceService.data.stocks.filter(function(item) {
                return item.symbol === 'APPL';
            });

            expect(stock[0].symbol).toEqual('APPL');
            expect(stock[0].shares).toEqual(25);

            _balanceService.removeShare('APPL', 15);

            expect(stock[0].shares).toEqual(10);
        });

        it('should get total shares', function() {
            _balanceService.addShare('GOOGL', 25);
            _balanceService.addShare('APPL', 25);
            _balanceService.addShare('YAHO', 10);
            _balanceService.addShare('YAHO', 5);

            expect(_balanceService.getTotalShares()).toEqual(65);
        });

    });

})();
