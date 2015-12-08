var app = angular.module("PinterestApp", ["ui.bootstrap", "firebase", "ui.router", "wu.masonry"]);


app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login-page");

  $stateProvider
    .state('login-page', {
      url: "/login-page",
      templateUrl: "app/partials/splash-page.html",
      controller: "loginCtrl"
    })
    .state('main-page', {
      url: "/main-page",
      templateUrl: "app/partials/main-page.html",
      controller: "mainPageCtrl"
    })
    .state('main-page.content', {
      url: "/main-page-content",
      templateUrl: "app/partials/main-page.content.html",
      controller: "mainPageCtrl"
    });
});