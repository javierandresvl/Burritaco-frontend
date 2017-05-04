var app = angular.module('burritaco', [
    'ngRoute'
    ]);

app.config(function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
    .when('/us', {
            templateUrl:'views/us.html',
            controller:'UsCtrl'
    })
    .when('/graphic',{
      templateUrl: 'views/graphic.html',
      controller: 'GraphicCtrl'
    })
    .otherwise({
        redirectTo: '/home'
      });
});
