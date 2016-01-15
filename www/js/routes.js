angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('menu.eventDays', {
      url: '/days',
      views: {
        'side-menu21': {
          templateUrl: 'templates/eventDays.html',
          controller: 'eventDaysCtrl'
        }
      }
    })
        
      
    
      
        
    .state('groups', {
      url: '/groups',
      templateUrl: 'templates/groups.html',
      controller: 'groupsCtrl'
    })
        
      
    
      
        
    .state('menu.createEventDay', {
      url: '/create/day',
      views: {
        'side-menu21': {
          templateUrl: 'templates/createEventDay.html',
          controller: 'createEventDayCtrl'
        }
      }
    })
        
      
    
      
        
    .state('createGroup', {
      url: '/create/group',
      templateUrl: 'templates/createGroup.html',
      controller: 'createGroupCtrl'
    })
        
      
    
      
        
    .state('addUsers', {
      url: '/add-users',
      templateUrl: 'templates/addUsers.html',
      controller: 'addUsersCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu/days');

});