(function() {
    'use strict';

    describe('Settings Service', function() {

        var _settingsService, _rootScope;

        beforeEach(module('stockr'));
        beforeEach(inject(function(settingsService, $rootScope) {
            _settingsService = settingsService;
            _rootScope = $rootScope;
        }));

        it('should be able to save a value', function() {

            _settingsService.set('stockPrice', 'abc');

            expect(localStorage.stockPrice).not.toBeUndefined();
            expect(localStorage.stockPrice).toEqual('abc');

        });

        it('should be able to get a value', function() {

            var returnedValue;

            _settingsService.set('test', 'dfg');

            var promise = _settingsService.get('test');

            promise.then(function(value) {
               returnedValue = value;
            });

            expect(returnedValue).toBeUndefined();

            // apply the digest cycle so the promise will get resolved
            _rootScope.$apply();
            expect(returnedValue).toEqual('dfg');

        });

    });

})();
