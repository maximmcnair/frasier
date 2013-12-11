'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
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