'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/',
    { templateUrl: 'partials/home.html'
    , controller: 'HomeCtrl'
    })
  $routeProvider.when('/tasks',
    { templateUrl: 'partials/tasks.html'
    , controller: 'TasksCtrl'
    })
  $routeProvider.when('/tasks/:taskId',
    { templateUrl: 'partials/task.html'
    , controller: 'TaskCtrl'
    })
  $routeProvider.otherwise({redirectTo: '/'})
}])

// Add clone functionality to array
Array.prototype.clone = function() { return this.slice(0); }

Array.prototype.extend = function (other_array) {
    /* you should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
}