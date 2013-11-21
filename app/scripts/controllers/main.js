'use strict';

angular.module('golApp')
.controller('MainCtrl', function ($scope, $timeout) {

  var blinker = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}],
      tattoo = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 0}, {x: 1, y: 1}],
      gleiter = [{x: 1, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 1, y: 2}, {x: 0, y: 2}],
      directions = [[0, 1], [1, 1], [1, 0], [1, -1],
                    [0, -1], [-1, -1], [-1, 0], [-1, 1]];
  $scope.cells = tattoo;
  // $scope.cells = gleiter;
  $scope.generations = 0;

  function alive (point) {
    return _.findWhere($scope.cells, point)
  }

  function countNeighbors (point) {
    return _.reduce(getNeighbors(point), function (memo, n) {
      return memo += alive(n) ? 1 : 0;
    }, 0)
  }

  function getNeighbors (point) {
    return _.reduce(directions, function (memo, d) {
      memo.push({x: point.x + d[0], y: point.y + d[1]})
      return memo;
    }, [])
  }

  function nextGenAlive (alive, neighborCount) {
    if (alive && (neighborCount < 2 || neighborCount > 3)) return false;
    if (alive && (neighborCount == 2 || neighborCount == 3)) return true;
    if (!alive && neighborCount == 3) return true;
    return false;
  }

  function cellsOfInterest () {
    return _.chain($scope.cells)
     .reduce(function (memo, c) {
      memo.push(getNeighbors(c));
      return memo;
     }, [])
     .flatten()
     .uniq(function(c) {return c.x + '-' + c.y})
     .value()
  }

  function getNextGen () {
    return _.filter(cellsOfInterest(), function(c) {
      return nextGenAlive(alive(c), countNeighbors(c));
    })
  }

  var timer;

  function update () {
    $scope.cells = getNextGen();
    $scope.cellsAlive = $scope.cells.length
    $scope.generations += 1;
    timer = $timeout(update, 200);
  }
  timer = $timeout(update, 1000);

  $scope.countNeighbors = countNeighbors;
  $scope.nextGenAlive = nextGenAlive;
  $scope.cellsOfInterest = cellsOfInterest;

});
