angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
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
    .state('user', {
      url: '/user',
      abstract:true,
      data: {
        requireLogin: true
      },
      templateUrl: 'templates/user/menu.html',
      controller: 'menuCtrl'
    })
    .state('user.day', {
      url: '/day',
      abstract: true,
      views: {
        'content': {
          template: '<ion-nav-view name="day"></ion-nav-view>'
        }
      }
    })

    .state('user.day.id', {
      url: '/:id/detail',
      views: {
        'day': {
          templateUrl: 'templates/user/days/day-detail.html',
          controller: 'app.controllers.user.day.detail'
        }
      }
    })
    .state('user.day.list', {
      url: '/list',
      views: {
        'day': {
          templateUrl: 'templates/user/days/day-list.html',
          controller: 'app.controllers.user.day.list'
        }
      }
    })
    .state('admin', {
      url: '/app',
      abstract:true,
      data: {
        requireLogin: true
      },
      templateUrl: 'templates/admin/menu.html',
      controller: 'menuCtrl'
    })

    .state('admin.day', {
      url: '/day',
      abstract: true,
      views: {
        'content': {
          template: '<ion-nav-view name="day"></ion-nav-view>'
        }
      }
    })
    .state('admin.day.id', {
      url: '/:id/detail',
      views: {
        'day': {
          templateUrl: 'templates/admin/days/day-detail.html',
          controller: 'detailDayCtrl'
        }
      }
    })

    .state('admin.day.list', {
      url: '/list',
      views: {
        'day': {
          templateUrl: 'templates/admin/days/day-list.html',
          controller: 'listDayCtrl'
        }
      }
    })

    .state('admin.create', {
      url: '/create',
      abstract:true,
      views: {
        'content': {
          template: '<ion-nav-view name="create"></ion-nav-view>'
        }
      }
    })

    .state('admin.create.day', {
      url: '/day',
      views: {
        'create': {
          templateUrl: 'templates/admin/create/day.html',
          controller: 'createDayCtrl'
        }
      }
    })

    .state('admin.create.group', {
      url: '/group',
      views: {
        'create': {
          templateUrl: 'templates/admin/createGroup.html',
          controller: 'createGroupCtrl'
        }
      }
    })

    .state('admin.groups', {
      url: '/groups',
      views: {
        'content': {
          template: '<ion-nav-view name="groups"></ion-nav-view>'
        }
      }
    })

    .state('admin.groups.list', {
      url: '/',
      views: {
        'groups': {
          templateUrl: 'templates/admin/groups.html',
          controller: 'groupsCtrl'
        }
      }
    })

    .state('admin.groups.group', {
      url:'/group/:id',
      abstract: true,
      views: {
        'groups': {
          template: '<ion-nav-view name="group"></ion-nav-view>'
        }
      }
    })

    .state('admin.groups.group.addUsers', {
      url: '/add-users',
      views: {
        'group': {
          templateUrl: 'templates/admin/addUsers.html',
          controller: 'addUsersCtrl'
        }
      }
    })
});
