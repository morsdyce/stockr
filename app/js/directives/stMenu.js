(function () {
    'use strict';

    angular
        .module('stockr')
        .directive('stMenu', stMenu);

    stMenu.$inject = ['$mdDialog'];

    /* @ngInject */
    function stMenu($mdDialog) {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'views/stMenuDirective.html',
            controllerAs: 'stMenuController as menu'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.openDialog = function(dialogName, $event) {

                $mdDialog.show({
                    targetEvent: $event,
                    template:
                    '<md-dialog>' +
                    '  <md-content>Hello!</md-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()">' +
                    '      Close Greeting' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
                    controller: 'testController'
                });
            }
        }
    }
})();