'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('tasksFactory', function (taskStorage, $rootScope, $filter) {
    var factory = {}

    // var tasks =
    //   [ { id:0, title: 'White Chocolate', estimate: 10000, time: 12302300, active: false, complete: false}
    //   , { id:1, title: 'Dark Chocolate', estimate: 100000, time: 0, active: false, complete: false}
    //   , { id:2, title: 'Cherry Chocolate', estimate: 2300000, time: 0, active: false, complete: false}
    //   , { id:3, title: 'Sweet Chocolate', estimate: 0, time: 34000, active: false, complete: true}
    //   ]

    var tasks = taskStorage.get()
    , uncompletedTasks = []
    , completedTasks = []

    factory.updateFilters = function () {
      uncompletedTasks = $filter('filter')(tasks, {complete: false})
      completedTasks = $filter('filter')(tasks, {complete: true})
    }
    
    factory.updateFilters()

    factory.getTasks = function () {
      return uncompletedTasks
    }

    factory.getCompleted = function () {
      return completedTasks
    }

    factory.getTask = function (id) {
      for (var i = uncompletedTasks.length - 1; i >= 0; i--) {
        if (uncompletedTasks[i].id == id) {
          return uncompletedTasks[i]
        }
      }
    }

    factory.getNextTask = function (currentTaskId) {
      // console.log('currentTaskId', currentTaskId)
      for (var i = uncompletedTasks.length - 1; i >= 0; i--) {
        if (uncompletedTasks[i].id == currentTaskId) {
          return uncompletedTasks[i + 1]
        }
      }
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
      // Find correct task
      var result = $.grep(uncompletedTasks, function(e){
        return e.id == task.id
      })

      // Replace data
      for (var key in changedAttr) {
        task[key] = changedAttr[key]
      }

      factory.update()
    }

    factory.update = function () {
      // Create cloned data
      var a = uncompletedTasks.clone()
        , b = completedTasks.clone()

      // Add b to a
      a.extend(b)

      // Replace tasks with a
      tasks = a

      console.log('tasks: ', _.pluck(tasks, 'title'))

      // Save updated data
      taskStorage.put(tasks)

      factory.updateFilters()
      // uncompletedTasks = $filter('filter')(tasks, {complete: false})
      // completedTasks = $filter('filter')(tasks, {complete: true})
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


// function clone(obj) {
//   if (null == obj || "object" != typeof obj) return obj;
//   var copy = obj.constructor();
//   for (var attr in obj) {
//     if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
//   }
//   return copy;
// }

_.sortedIndexOf = function (array, obj, iterator) {
    var result = _.sortedIndex(array, obj, iterator),
        reference = iterator(obj);
    if (result< array.length && iterator(array[result]) === iterator(obj)) { 
      while(result && iterator(array[result - 1]) === reference) 
          result--;
      return result;
    } else {
      return -1;
    }
}