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

  .controller('eventDaysCtrl', function($scope) {

  })

  .controller('groupsCtrl', function($scope) {

  })

  .controller('createEventDayCtrl', function($scope) {

  })

  .controller('createGroupCtrl', function($scope) {

  })

  .controller('addUsersCtrl', function($scope) {

  });
