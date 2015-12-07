var app = angular.module("PinterestApp", ["ui.bootstrap", "firebase", "ngRoute", 'angular-embedly']);

app.config(["$routeProvider", "embedlyServiceProvider", function($routeProvider, embedlyServiceProvider) {

	$routeProvider
	.when('/login-page', {
		templateUrl: 'app/partials/splash-page.html',
		controller: 'loginCtrl'
	})
	.when('/main-page', {
		templateUrl: 'app/partials/main-page.html',
		controller: 'mainPageCtrl'
	})
	.otherwise('/login-page');

}]);