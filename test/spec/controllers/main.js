'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('golApp'));

  var MainCtrl,
    scope;
  var blinker = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.cells = blinker;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should count correctly', function () {
    expect(scope.countNeighbors({x: -1, y: 0})).toBe(3);
    expect(scope.countNeighbors({x: 0, y: 0})).toBe(2);
    expect(scope.countNeighbors({x: 1, y: 0})).toBe(3);
    expect(scope.countNeighbors({x: 1, y: -1})).toBe(2);
  });

  it('should kill and give birth correctly', function () {
    expect(scope.nextGenAlive(false, 2)).toBe(false);
    expect(scope.nextGenAlive(false, 3)).toBe(true);
  })

  it('should count area of interest correctly', function () {
    expect(scope.cellsOfInterest().length).toBe(15);
  })
});
