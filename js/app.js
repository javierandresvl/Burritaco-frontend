var app = angular.module('burritaco', [
    'ngRoute', 'chart.js'
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
    .when('/graph',{
      templateUrl: 'views/graph.html',
      controller: 'GraphCtrl'
    })
    .when('/map',{
      templateUrl: 'views/map.html',
      controller: 'MapCtrl'
    })
    .when('/tweets',{
      templateUrl: 'views/tweets.html',
      controller: 'TweetsCtrl'
    })
    .otherwise({
        redirectTo: '/home'
      });
});
