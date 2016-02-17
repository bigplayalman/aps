angular.module('app.services', [])

.factory('User', [function(){

}])
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
  .factory('Day', function (Parse) {
    var Day = Parse.Object.extend('Day');
    var attributes = ['date', 'times', 'invited','name', 'accepted', 'pending', 'declined', 'current', 'max', 'status'];
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

    return {
      getDay: getDay,
      getDays: getDays,
      saveDay: saveDay
    }
  });

