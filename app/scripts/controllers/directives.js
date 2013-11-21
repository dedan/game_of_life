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
      var x = d3.scale.linear()
                .domain([-50, 50])
                .range([0, width])
      var y = d3.scale.linear()
                .domain([-50, 50])
                .range([height, 0])

      scope.$watch('data', function (newVal) {
        if (!newVal) return;
        var points = chart.selectAll('circle').data(newVal, function (e) {return e.x+'-'+e.y});
        points.enter().append('circle')
          .attr('cx', function (d) {return x(d.x);})
          .attr('cy', function (d) {return y(d.y);})
          .attr('r', 0)
        points.transition().duration(20)
          .attr('cx', function (d) {return x(d.x);})
          .attr('cy', function (d) {return y(d.y);})
          .attr('r', 2)
        points.exit().transition().duration(20).attr('r', 0).remove();
      })


    }
  }
})