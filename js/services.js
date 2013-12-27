'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('tasksFactory', function (taskStorage, $rootScope, $filter) {
    var factory = {}

    // var tasks =
    //   [ { id:0, title: 'Cheese fridge', estimate: 10000, time: 12302300, active: false, complete: false}
    //   , { id:1, title: 'Cheese board two', estimate: 100000, time: 0, active: false, complete: false}
    //   , { id:2, title: 'Cheese board three', estimate: 2300000, time: 0, active: false, complete: false}
    //   , { id:3, title: 'Three', estimate: 0, time: 34000, active: false, complete: true}
    //   ]

    var tasks = taskStorage.get()
    , uncompletedTasks = $filter('filter')(tasks, {complete: false})
    , completedTasks = $filter('filter')(tasks, {complete: true})

    // factory.get = function () {
    //   return tasks
    // }

    factory.getTasks = function () {
      return uncompletedTasks
    }

    factory.getCompleted = function () {
      return completedTasks
    }

    factory.getTask = function (id) {
      return tasks[id]
    }

    factory.createTask = function (title, estimate) {
      var topID = tasks.length
      uncompletedTasks.push({
        id: topID
      , title: title
      , estimate: estimate
      , time: 0
      , active: false
      , complete: false
      })
      factory.update()
    }

    factory.updateTask = function (task, changedAttr) {
      // changedAttr = {'title': 'cheese'}
      // console.log(task, changedAttr)

      // Find correct task
      var result = $.grep(tasks, function(e){
        return e.id == task.id
      })
      // console.log('result: ', result)

      // Replace data
      // var updateTask = clone(task)
      // for (var key in changedAttr) {
      //   updateTask[key] = changedAttr[key]
      // }
      // var updateTask = clone(task)

      // Replace data
      for (var key in changedAttr) {
        task[key] = changedAttr[key]
      }

      factory.update()
    }

    factory.update = function () {
      console.log('tasks:', tasks)
      // Create cloned data
      var a = uncompletedTasks.clone()
        , b = completedTasks.clone()

      // Add b to a
      a.extend(b)

      // Replace tasks with a
      tasks = a

      // Save updated data
      taskStorage.put(tasks)
    }

    return factory
  })
  .factory('taskStorage', function () {
    var STORAGE_ID = 'frasier'

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]')
      },

      put: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos))
      }
    }
  })
  .value('version', '0.1');


function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}