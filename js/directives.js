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