angular.module('admin.controllers', [])

  .controller('admin.controllers.menu.ctrl', function($scope, $state, Parse) {
    $scope.user = Parse.User.current();
  })

  .controller('admin.controllers.user.create.ctrl', function($scope, $ionicPopup, User) {
    $scope.title = 'Add';
    $scope.user = {};

    $scope.showError = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Email Already Exists',
        template: 'Please use another email'
      });
      alertPopup.then(function(res) {
        $scope.user.email = null;
      });
    };
    $scope.showSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'User Created'
      });
      alertPopup.then(function(res) {
        $scope.user = {};
      });
    };

    $scope.updateUser = function () {
      $scope.user.status = 'pending';

      User.findUser($scope.user.email).then(function (users) {
        if(users.length > 0) {
          $scope.showError();
        } else {
          User.saveUser($scope.user).then(function () {
            $scope.showSuccess();
          });
        }
      });
    };

  })
  .controller('admin.controllers.user.list.ctrl', function ($scope, $state, $ionicModal, User) {
    $scope.search = {};
    User.getUsers().then(function (users) {
      $scope.users = users;
    });

    $scope.updateUser = function (user) {
      User.saveUser(user).then(function () {
        $scope.modal.hide();
      });
    };

    $ionicModal.fromTemplateUrl('templates/admin/modals/user-detail-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(user) {
      $scope.currentUser = user.toJSON();
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  })


  .controller('admin.controllers.day.create.ctrl', function($scope, $state, $ionicPopup, $timeout, Day) {
    $scope.title = 'Create Day';

    $scope.day = {
      date: null
    };

    var yesterday = new Date();
    var day = 1;
    yesterday.setDate(yesterday.getDate() - day);
    var nextYear = new Date();
    var year = 365;
    nextYear.setDate(nextYear.getDate() + year);

    $scope.showDatepicker = function() {
      $scope.datePopup = $ionicPopup.show({
        title: 'Pick a Date',
        template: '<onezone-datepicker datepicker-object="datepicker"></onezone-datepicker>',
        scope: $scope,
        buttons: [
          { text: 'Cancel'}
        ]
      });
    };

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
      calendarMode: true,
      hideCancelButton: true,
      hideSetButton: true,
      callback: function(value){
        $scope.datepicker.date = value;
        $scope.day.date = $scope.datepicker.date;
        $scope.datePopup.close();
      }
    };

    $scope.actionButton = function () {
      $scope.day.status = 'pre-registration';
      $scope.day.current = 0;
      $scope.day.callTimes = [];
      Day.saveDay($scope.day).then(function (day){
        $state.go('admin.list');
      });
    }
  })

  .controller('admin.controllers.day.edit.ctrl', function($scope, $state, Day, DayServices) {
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
    $scope.days = [];
    Day.getDays().then(function(days){
      $scope.days = days;
    });

  })
  .controller('admin.controllers.day.detail.ctrl', function($scope, $ionicPopup, $state, $filter, AppServices, Day, DayServices) {
    $scope.day = DayServices.getDay();
    $scope.time = {};

    $scope.addTime = function () {
      var time = $filter('date')($scope.time.input, 'h:mm a');
      $scope.day.callTimes.push(time);
      Day.saveDay($scope.day);
    };
    $scope.deleteDate = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete this event day?',
        template: 'Are you sure you want to delete event?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          Day.deleteDay($scope.day.id).then(function () {
            AppServices.resetNavigation();
            $state.go('admin.list');
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
  });
