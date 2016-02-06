angular.module('app.controllers', [])

  .controller('loginCtrl', function($scope, $state, Parse) {
    $scope.user = {};
    Parse.User.logOut();
    $scope.loginUser = function () {
      Parse.User.logIn($scope.user.username, $scope.user.password, {
        success: function(user) {
          $state.go('menu.days');
        },
        error: function (user, error) {
          $scope.warning = error.message;
        }
      });
    };
    $scope.$watch('user', function(newVal, oldVal){
      $scope.warning = null;
    }, true);
  })

  .controller('createDayCtrl', function($scope, Day, $filter) {
    $scope.day = {};
    var yesterday = new Date(); // today!
    var day = 1; // go back 5 days!
    yesterday.setDate(yesterday.getDate() - day);
    var nextYear = new Date();
    var year = 365; // go back 5 days!
    nextYear.setDate(nextYear.getDate() + year);

    $scope.date = {
      closeLabel: 'Close',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      mondayFirst: true,  //Optional
      templateType: 'modal', //Optional
      showTodayButton: true, //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: yesterday, //Optional
      to: nextYear,  //Optional
      dateFormat: 'dd-MM-yyyy', //Optional
      callback: function (val) {  //Mandatory
        $scope.date.inputDate = val;
        $scope.day.date = $filter('date')(new Date($scope.date.inputDate), 'dd/MM/yyyy');
      }
    };


    $scope.createDay = function () {
      $scope.day.status = 'pre-registration';
      $scope.day.current = 0;
      Day.saveDay($scope.day).then(function (day){
        console.log(day.id);
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
  .controller('detailDayCtrl', function($scope, $filter, $stateParams, Day) {
    var yesterday = new Date(); // today!
    var day = 1; // go back 5 days!
    yesterday.setDate(yesterday.getDate() - day);
    var nextYear = new Date();
    var year = 365; // go back 5 days!
    nextYear.setDate(nextYear.getDate() + year);

    $scope.day = {};
    var id = $stateParams.id;
    Day.getDay(id).then(function (day) {
      $scope.day = day;
    });

    $scope.pickerDate = {
      closeLabel: 'Close',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      mondayFirst: true,  //Optional
      templateType: 'modal', //Optional
      showTodayButton: false, //Optional
      modalHeaderColor: 'bar-calm', //Optional
      modalFooterColor: 'bar-calm', //Optional
      from: yesterday, //Optional
      to: nextYear,  //Optional
      dateFormat: 'dd-MM-yyyy', //Optional
      callback: function (val) {  //Mandatory
        $scope.pickerDate.inputDate = val;
        $scope.day.date = $filter('date')(new Date($scope.pickerDate.inputDate), 'dd/MM/yyyy');
      }
    };

  })

  .controller('groupsCtrl', function($scope) {

  })

  .controller('createGroupCtrl', function($scope) {

  })

  .controller('addUsersCtrl', function($scope) {

  });
