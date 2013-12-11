'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('tasksFactory', function () {
    var factory = {}

    var tasks =
      [ { id:0, title: 'Cheese fridge', estimate: 10000, time: 12302300, active: false, complete: false}
      , { id:1, title: 'Cheese board two', estimate: 100000, time: 0, active: false, complete: false}
      , { id:2, title: 'Cheese board three', estimate: 2300000, time: 0, active: false, complete: false}
      , { id:3, title: 'Three', estimate: 0, time: 34000, active: false, complete: true}
      ]

    factory.getTasks = function () {
      return tasks
    }

    factory.getTask = function (id) {
      return tasks[id]
    }

    factory.createTask = function (title, estimate) {
      var topID = tasks.length
      tasks.push({
        id: topID
      , title: title
      , estimate: estimate
      , time: 0
      , active: false
      , complete: false
      })
    }

    return factory
  })
  .value('version', '0.1');
