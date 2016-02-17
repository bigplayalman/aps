angular.module('admin.controllers', [])

  .controller('admin.controllers.menu.ctrl', function($scope, $state, Parse) {
    $scope.user = Parse.User.current();
  })

  .controller('admin.controllers.day.create.ctrl', function($scope, $state, Day) {
    $scope.title = 'Create Day';

    $scope.day = {};
    var yesterday = new Date();
    var day = 1;
    yesterday.setDate(yesterday.getDate() - day);
    var nextYear = new Date();
    var year = 365;
    nextYear.setDate(nextYear.getDate() + year);

    $scope.datepicker = {
      date: new Date(), // MANDATORY
      mondayFirst: false,
      startDate: yesterday,
      endDate: nextYear,
      disablePastDays: true,
      disableSwipe: false,
      disableWeekend: false,
      showDatepicker: false,
      showTodayButton: true,
      calendarMode: false,
      hideCancelButton: true,
      hideSetButton: true,
      callback: function(value){
        $scope.datepicker.date = value;
        $scope.day.date = value;
      }
    };

    $scope.actionButton = function () {
      $scope.day.status = 'pre-registration';
      $scope.day.current = 0;
      Day.saveDay($scope.day).then(function (day){
        $state.go('admin.day.list');
      });
    }
  })

  .controller('admin.controllers.edit.ctrl', function($scope, $state, Day, DayServices) {
    $scope.title = 'Update Day';
    var yesterday = new Date();
    var day = 1;
    yesterday.setDate(yesterday.getDate() - day);
    var nextYear = new Date();
    var year = 365;
    nextYear.setDate(nextYear.getDate() + year);

    $scope.day = DayServices.getDay();

    $scope.datepicker = {
      date: new Date($scope.day.date), // MANDATORY
      mondayFirst: false,
      startDate: yesterday,
      endDate: nextYear,
      disablePastDays: true,
      disableSwipe: false,
      disableWeekend: false,
      showDatepicker: false,
      showTodayButton: true,
      calendarMode: false,
      hideCancelButton: true,
      hideSetButton: true,
      callback: function(value){
        $scope.datepicker.date = value;
        $scope.day.date = value;
        Day.saveDay($scope.day);
      }
    };

    $scope.actionButton = function () {
      Day.saveDay($scope.day).then(function (day){
        $state.go('admin.day.detail', {id: day.id});
      });
    }
  })

  .controller('admin.controllers.day.list.ctrl', function($scope, Day) {
    $scope.days =[];
    Day.getDays().then(function(days){
      $scope.days = days;
    });
  })
  .controller('admin.controllers.day.detail.ctrl', function($scope, $filter, $stateParams, Day, DayServices) {
    $scope.day = DayServices.getDay();
  });
