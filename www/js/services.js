angular.module('app.services', [])
  .service('AppServices', function ($ionicHistory) {

    var resetNavigation = function () {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
    };

    return {
      resetNavigation: resetNavigation
    }

  })
  .service('DayServices', function () {
    var day = {};
    var setDay = function (data) {
      day = data;
    };
    var getDay = function () {
      return day;
    };

    return {
      setDay: setDay,
      getDay: getDay
    }
  })
  .factory('User', function (Parse) {
    var User = Parse.Object.extend('Staffer');
    var attributes = ['email', 'status', 'user', 'type', 'firstName', 'lastName'];
    Parse.defineAttributes(User, attributes);

    return {
      findUser: findUser,
      getUser: getUser,
      getUsers: getUsers,
      saveUser: saveUser
    };

    function getUser (id) {
      var query = new Parse.Query(User);
      query.ascending('lastName');
      return query.get(id);
    }

    function findUser (email) {
      var query = new Parse.Query(User);
      query.equalTo('email', email);
      return query.find();
    }

    function getUsers () {
      var query = new Parse.Query(User);
      return query.find();
    }

    function saveUser (properties) {
      var user = new User();
      user.set(properties);
      return user.save();
    }
  })

  .factory('Day', function (Parse) {
    var Day = Parse.Object.extend('Day');
    var attributes = ['date', 'callTimes', 'invited','name', 'accepted', 'pending', 'declined', 'current', 'max', 'status'];
    Parse.defineAttributes(Day, attributes);

    var getDay = function (id) {
      var query = new Parse.Query(Day);
      return query.get(id);
    };

    var getDays = function () {
      var user = Parse.User.current();
      var query = new Parse.Query(Day);
      return query.find();
    };

    var saveDay = function (properties) {
      var day = new Day();
      day.set(properties);
      return day.save();
    };

    var deleteDay = function (id) {
      var day = new Day();
      day.id = id;
      return day.destroy();
    };

    return {
      deleteDay: deleteDay,
      getDay: getDay,
      getDays: getDays,
      saveDay: saveDay
    }
  });

