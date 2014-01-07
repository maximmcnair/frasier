'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    }
  }])
  .directive('hideon', function() {
    return function (scope, element, attrs) {
      scope.$watch(attrs.hideon, function (value, oldValue) {
        if(value) {
          element.show()
        } else {
          element.hide()
        }
      }, true)
    }
  })
.directive('backButton', function () {
  return {
    restrict: 'E',
    template: '<button class="btn">{{back}}</button>',
    scope: {
      back: '@back',
      forward: '@forward',
      icons: '@icons'
    },
    link: function(scope, element, attrs) {
      $(element[0]).on('click', function() {
        history.back();
        scope.$apply();
      });
      // $(element[1]).on('click', function() {
      //   history.forward();
      //   scope.$apply();
      // });
    }
  };
});
