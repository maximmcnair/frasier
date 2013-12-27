'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
//========================================================
//  Home controller
//========================================================
  .controller('HomeCtrl', function() {

  })
//========================================================
//  Tasks controller
//========================================================
  .controller('TasksCtrl', function($scope, $http, $filter, tasksFactory) {

    $scope.tasks = tasksFactory.getTasks()
    $scope.completedTasks = tasksFactory.getCompleted()

    $scope.sortableOptions = {
      stop: function(e, ui) {
        // console.log(e, ui)
        console.log('Sorted tasks: ', _.pluck($scope.tasks, 'title'))
        tasksFactory.update()
      }
    };

    $scope.addTask = function () {
      tasksFactory.createTask(
        $scope.newTask.title
      , hrsToMillSec($scope.newTask.estimateHrs) + minsToMillSec($scope.newTask.estimateMins)
      )

      $scope.newTask = null
    }


    $scope.timePretty = timePretty

    // $scope.todayTasks = $filter('filter')($scope.tasks, {complete: false})
    // $scope.completedTasks = $filter('filter')($scope.tasks, {complete: true})


    // $scope.$watch('tasks', function () {
    //   console.log($scope.tasks)
    //   $scope.todayTasks = $filter('filter')($scope.tasks, {complete: false})
    //   $scope.completedTasks = $filter('filter')($scope.tasks, {complete: true})
    // }, true)

  })
//========================================================
//  Task controller
//========================================================
  .controller('TaskCtrl', function($scope, tasksFactory, $routeParams, $timeout, $location) {
    $scope.timePretty = timePretty
    $scope.task = tasksFactory.getTask($routeParams.taskId)

    // If there is no task, then go to /tasks
    if($scope.task === undefined) $location.path('/tasks')

    // Make task active
    // $scope.task.active = true
    tasksFactory.updateTask($scope.task, {active: true})

    // Has task been active before?
    // var taskActive = ($scope.task.time === 0 ? false : true)

    // Update progress
    if($scope.task.estimate < $scope.task.time){
      $scope.progress = ($scope.task.estimate / $scope.task.time) * 100
    } else {
      var progress =  ($scope.task.time / $scope.task.estimate ) * 100
      $scope.progress = (progress > 100 ? 100 : progress)
    }

    // Update overdue
    $scope.overdue = $scope.task.estimate < $scope.task.time

    // Start timer counter
    increment()

    function increment(){
      if($scope.task.active === true){
        // Increment time
        $scope.task.time += 1000
        tasksFactory.updateTask($scope.task, {time: $scope.task.time})

        // Update progress
        if($scope.task.estimate < $scope.task.time){
          $scope.progress = ($scope.task.estimate / $scope.task.time) * 100
        } else {
          var progress =  ($scope.task.time / $scope.task.estimate ) * 100
          $scope.progress = (progress > 100 ? 100 : progress)
        }

        // Update overdue
        $scope.overdue = $scope.task.estimate < $scope.task.time

        // If task is still active loop increment
        $timeout(function () {
          // console.log($scope.task.time)
          increment()
        }, 1000)
      }
    }

    // $scope.$watch('overdue', function () {
    //   console.log('Watch: ', $scope.overdue)
    // }, true)

    // Pause functionality
    $scope.pause = function () {
      console.log('pause')
      // $scope.task.active = false
      tasksFactory.updateTask($scope.task, {active: false})
    }

    // Play functionality
    $scope.play = function () {
      console.log('play')
      // $scope.task.active = true
      tasksFactory.updateTask($scope.task, {active: true})
      increment()
    }

    // Finish functionality
    $scope.finish = function () {
      console.log('finish')
      // $scope.task.active = false
      // $scope.task.complete = true
      tasksFactory.updateTask($scope.task, {
        active: false
      , complete: true
      })
      $location.path('/tasks')
    }

    // Stop functionality
    $scope.stop = function () {
      console.log('stop')
      // $scope.task.active = false
      tasksFactory.updateTask($scope.task, {active: false})
      $location.path('/tasks')
    }

  })


//========================================================
//  Controller helpers
//========================================================
function hrsToMillSec(hrs){
  return hrs * 60 * 60 * 1000
}

function minsToMillSec(mins){
  return mins * 60 * 1000
}

function timePretty(dateObject){
  var milliseconds = dateObject;

  // TIP: to find current time in milliseconds, use:
  // var milliseconds_now = new Date().getTime();

  var seconds = milliseconds / 1000;
  // var numyears = Math.floor(seconds / 31536000);
  // if(numyears){
  //     return numyears + 'year' + ((numyears > 1) ? 's' : '');
  // }
  // var numdays = Math.floor((seconds % 31536000) / 86400);
  // if(numdays){
  //     return numdays + 'day' + ((numdays > 1) ? 's' : '');
  // }
  var numhours = Math.floor(((seconds % 31536000)) / 3600)
  ,   numMins = Math.round(((((seconds % 31536000)) / 3600) - numhours) * 60);
  // console.log( (((seconds % 31536000) % 86400) / 3600) - numhours) * 60;
  if(numhours){
      var hours = numhours + 'hr' + ((numhours > 1) ? 's' : '')
      ,   mins = numMins + 'min' + ((numMins > 1) ? 's' : '');

      return hours + ' ' + ((numMins > 1) ? mins : '');
  }
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  if(numminutes){
      return numminutes + 'min' + ((numminutes > 1) ? 's' : '');
  }
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  if(numseconds){
      return numseconds.toFixed() + 'sec' + ((numseconds > 1) ? 's' : '');
  }
  return '0sec'; //'just now' //or other string you like;
}