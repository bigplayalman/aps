angular.module('app.controllers', [])

  .controller('loginCtrl', function($scope, $state, Parse) {
    $scope.user = {};
    $scope.loginUser = function () {
      Parse.User.logIn($scope.user.username, $scope.user.password, {
        success: function(user) {
          $state.go('menu.days');
        },
        error: function (user, error) {
          $scope.warning = error.message;
        }
      });
    }
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
