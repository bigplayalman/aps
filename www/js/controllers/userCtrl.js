angular.module('user.controllers', [])

  .controller('user.controllers.menu.ctrl', function($scope, $state, Parse) {
    $scope.user = Parse.User.current();
  })

  .controller('user.controllers.day.list.ctrl', function($scope, Day) {
    $scope.days =[];

    Day.getDays().then(function(days){
      $scope.days = days;
    });
  })

  .controller('user.controllers.day.detail.ctrl', function($scope, $filter, $stateParams, Day) {
    $scope.attendee = {};
    $scope.day = {};
    var id = $stateParams.id;
    Day.getDay(id).then(function (day) {
      $scope.day = day;
    });

  });
