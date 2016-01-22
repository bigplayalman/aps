angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/side-menu/days');

  $stateProvider
    .state('login', {
      url: '/login',
      cache: false,
      data: {
        requireLogin: false
      },
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('menu', {
      url: '/side-menu',
      abstract:true,
      data: {
        requireLogin: true
      },
      templateUrl: 'templates/menu.html'
    })

    .state('menu.days', {
      url: '/days',
      views: {
        'content': {
          templateUrl: 'templates/days/day-list.html',
          controller: 'listDayCtrl'
        }
      }
    })

    .state('menu.create', {
      url: '/create',
      abstract:true,
      views: {
        'content': {
          template: '<ion-nav-view name="create"></ion-nav-view>'
        }
      }
    })

    .state('menu.create.day', {
      url: '/day',
      views: {
        'create': {
          templateUrl: 'templates/create/day.html',
          controller: 'createDayCtrl'
        }
      }
    })

    .state('menu.create.group', {
      url: '/group',
      views: {
        'create': {
          templateUrl: 'templates/createGroup.html',
          controller: 'createGroupCtrl'
        }
      }
    })

    .state('menu.groups', {
      url: '/groups',
      views: {
        'content': {
          template: '<ion-nav-view name="groups"></ion-nav-view>'
        }
      }
    })

    .state('menu.groups.list', {
      url: '/',
      views: {
        'groups': {
          templateUrl: 'templates/groups.html',
          controller: 'groupsCtrl'
        }
      }
    })

    .state('menu.groups.group', {
      url:'/group/:id',
      abstract: true,
      views: {
        'groups': {
          template: '<ion-nav-view name="group"></ion-nav-view>'
        }
      }
    })

    .state('menu.groups.group.addUsers', {
      url: '/add-users',
      views: {
        'group': {
          templateUrl: 'templates/addUsers.html',
          controller: 'addUsersCtrl'
        }
      }
    })
});
