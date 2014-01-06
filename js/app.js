'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute'
, 'myApp.filters'
, 'myApp.services'
, 'myApp.directives'
, 'myApp.controllers'
, 'ui'
, 'ui.bootstrap'
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

// https://trello.com/docs/gettingstarted/clientjs.html
// https://trello.com/docs/api/index.html

var opts = {
  type: 'popup'
, name: 'Frasier'
, success: function (response) {
    // Get user boards
    Trello.get( 'members/me/boards', function(boards){
      console.log('boards', boards)
      console.log( _.pluck(boards, 'name') )
    })

    // Display boards and ask user to pick one

    // Get lists from board
    // Trello.get('/boards/52bd538e25a23d6a7002bad6/lists', function (lists) {
    //   console.log('lists', lists)
    //   console.log( _.pluck(lists, 'name') )
    // })
    // Display lists and ask user to pick one

    // Get cards from boards
    Trello.get('/lists/52bd538e25a23d6a7002bad7/cards', function (cards) {
      console.log('cards', cards)
      console.log( _.pluck(cards, 'name') )
    })
    // Display cards and ask user to select which ones they want

    // Import to tasks
  }
, error: function (response) {
    console.log('error', response)
  }
}
Trello.authorize(opts)