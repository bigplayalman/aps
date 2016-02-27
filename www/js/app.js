angular.module('app', [
  'ionic',
  'onezone-datepicker',
  'ngCordova',
  'ngParse',
  'app.controllers',
  'app.routes',
  'app.services',
  'app.directives',
  'onog.filters'
])
  .run(function($rootScope, $state, $ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && Parse.User.current() === null) {
        event.preventDefault();
        $state.go('login');
      }
    });
  })
  .config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  })
  .config(['ParseProvider', function(ParseProvider) {
    ParseProvider.initialize("uUarCCjcopc6COU7kbgwrhqSxOmudmFpHf2MyvKj", "Q8ukJtw1LIVSDmyY2IArCRMOefYaH89xobeirufg");
  }]);
