angular.module('golApp')
.directive('golViz', function () {
  return {
    restrict: "EA",
    scope: {
      data: "="
    },
    link: function (scope, element) {
      var width = 500;
      var height = 500;
      var chart = d3.select(element[0]).append('svg')
        .attr('width', width)
        .attr('height', height)
      var points = chart.selectAll('circle').data(scope.data);
      var x = d3.scale.linear()
                .domain([-10, 10])
                .range([0, width])
      var y = d3.scale.linear()
                .domain([-10, 10])
                .range([height, 0])

      points.enter().append('circle')
        .attr('cx', function (d) {return x(d.x);})
        .attr('cy', function (d) {return y(d.y);})
        .attr('r', 10)


    }
  }
})