'use strict';

angular.module('golApp')
.controller('MainCtrl', function ($scope) {

  var blinker = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}],
      directions = [[0, 1], [1, 1], [1, 0], [1, -1],
                    [0, -1], [-1, -1], [-1, 0], [-1, 1]];
  $scope.data = blinker;

  $scope.countNeighbors = function (point, population) {
    return _.reduce(directions, function (memo, d) {
      return memo += _.findWhere(population, {x: point.x + d[0], y: point.x + d[1]}) ? 1 : 0;
    }, 0)
  }

});
