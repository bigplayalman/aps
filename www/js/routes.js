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
      controller: 'user.controllers.menu.ctrl'
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

    .state('user.day.detail', {
      url: '/:id/detail',
      views: {
        'day': {
          templateUrl: 'templates/user/days/day-detail.html',
          controller: 'user.controllers.day.detail.ctrl'
        }
      }
    })
    .state('user.day.list', {
      url: '/list',
      cache: 'false',
      views: {
        'day': {
          templateUrl: 'templates/user/days/day-list.html',
          controller: 'user.controllers.day.list.ctrl'
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
      controller: 'admin.controllers.menu.ctrl'
    })

    //end of user

    //start of admin

    .state('admin.user', {
      url: '/user',
      abstract: true,
      views: {
        'content': {
          template: '<ion-nav-view name="user"></ion-nav-view>'
        }
      }
    })

    .state('admin.user.create', {
      url: '/create',
      views: {
        'user': {
          templateUrl: 'templates/admin/users/user.html',
          controller: 'admin.controllers.user.create.ctrl'
        }
      }
    })
    .state('admin.user.list', {
      url: '/list',
      views: {
        'user': {
          templateUrl: 'templates/admin/users/user-list.html',
          controller: 'admin.controllers.user.list.ctrl'
        }
      }
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
    .state('admin.day.create', {
      url: '/create',
      views: {
        'day': {
          templateUrl: 'templates/admin/days/day.html',
          controller: 'admin.controllers.day.create.ctrl'
        }
      }
    })
    .state('admin.day.edit', {
      url: '/:id/edit',
      views: {
        'day': {
          templateUrl: 'templates/admin/days/day.html',
          controller: 'admin.controllers.day.edit.ctrl'
        }
      },
      resolve: {
        date: function ($stateParams, $q, Day, DayServices) {
          var cb = $q.defer();
          var id = $stateParams.id;
          Day.getDay(id).then(function (day) {
              DayServices.setDay(day);
              cb.resolve();
            },
            function (err) {
              cb.reject(err);
            });
          return cb.promise;
        }
      }
    })
    .state('admin.day.detail', {
      url: '/:id/detail',
      views: {
        'day': {
          templateUrl: 'templates/admin/days/day-detail.html',
          controller: 'admin.controllers.day.detail.ctrl'
        }
      },
      resolve: {
        date: function ($stateParams, $q, Day, DayServices) {
          var cb = $q.defer();
          var id = $stateParams.id;
          Day.getDay(id).then(function (day) {
            DayServices.setDay(day);
            cb.resolve();
          },
          function (err) {
            cb.reject(err);
          });
          return cb.promise;
        }
      }
    })

    .state('admin.list', {
      url: '/list',
      cache: false,
      views: {
        'content': {
          templateUrl: 'templates/admin/days/day-list.html',
          controller: 'admin.controllers.day.list.ctrl'
        }
      }
    })
});
