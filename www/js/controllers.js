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

  .controller('createDayCtrl', function($scope, Day) {
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
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: yesterday, //Optional
      to: nextYear,  //Optional
      dateFormat: 'dd-MM-yyyy', //Optional
      callback: function (val) {  //Mandatory
        $scope.date.inputDate = val;
        $scope.day.date = $scope.date.inputDate;
        console.log($scope.day.date);
      }
    };


    $scope.createDay = function () {
      Day.saveDay($scope.day).then(function (day){
        console.log(day.id);
      });
    }
  })

  .controller('listDayCtrl', function($scope, Day) {
    $scope.days =[];
    Day.getDays().then(function(days){
      $scope.days = days;
      console.log($scope.days);
    });
  })

  .controller('groupsCtrl', function($scope) {

  })

  .controller('createGroupCtrl', function($scope) {

  })

  .controller('addUsersCtrl', function($scope) {

  });
