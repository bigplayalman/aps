angular.module('app.controllers.admin', [])
  .controller('createDayCtrl', function($scope, Day, $filter) {
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

    $scope.createDay = function () {
      $scope.day.status = 'pre-registration';
      $scope.day.current = 0;
      Day.saveDay($scope.day).then(function (day){
        $scope.day = {};
        $scope.date = {};
      });
    }
  })

  .controller('listDayCtrl', function($scope, Day) {
    $scope.days =[];
    Day.getDays().then(function(days){
      $scope.days = days;
    });
  })
  .controller('detailDayCtrl', function($scope, $filter, $stateParams, Day, DayServices) {
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

  })

  .controller('groupsCtrl', function($scope) {

  })

  .controller('createGroupCtrl', function($scope) {

  })

  .controller('addUsersCtrl', function($scope) {

  });
