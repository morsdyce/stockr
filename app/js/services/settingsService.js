(function () {
    'use strict';

    angular
        .module('stockr')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$q'];

    /* @ngInject */
    function settingsService($q) {
        var service = {
            get: get,
            set: set
        };

        return service;

        ////////////////

        function get(key) {
            var defer = $q.defer();

            if (localStorage) {
                defer.resolve(localStorage[key]);
            } else {
                defer.reject();
            }

            return defer.promise;
        }

        /**
         * Save the value in localstorage
         * Compromise: Due to time saving this as a simple key value in local storage
         * normally I would either create a serialized object containing all the settings
         * or retrieving them from server.
         * @param key
         * @param value
         */
        function set(key, value) {
            localStorage[key] = value;

        }
    }
})();