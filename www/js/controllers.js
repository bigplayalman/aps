angular.module('app.controllers', [
  'app.controllers.admin',
  'app.controllers.user'
])
  .controller('menuCtrl', function($scope, $state, Parse) {
    $scope.user = Parse.User.current();
  })
  .controller('loginCtrl', function($scope, $state, Parse) {
    $scope.user = {};
    Parse.User.logOut();
    $scope.loginUser = function () {
      Parse.User.logIn($scope.user.username, $scope.user.password, {
        success: function(user) {
          if(user.get('type') === 'admin') {
            $state.go('admin.day.list');
          } else {
            $state.go('user.day.list');
          }
        },
        error: function (user, error) {
          $scope.warning = error.message;
        }
      });
    };
    $scope.$watch('user', function(newVal, oldVal){
      $scope.warning = null;
    }, true);
  });
