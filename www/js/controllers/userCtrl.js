angular.module('app.controllers.user', [])

  .controller('app.controllers.user.day.list', function($scope, Day) {
    $scope.days =[];

    Day.getDays().then(function(days){
      $scope.days = days;
    });
  })

  .controller('app.controllers.user.day.detail', function($scope, $filter, $stateParams, Day) {
    $scope.attendee = {};
    $scope.day = {};
    var id = $stateParams.id;
    Day.getDay(id).then(function (day) {
      $scope.day = day;
    });

  });
