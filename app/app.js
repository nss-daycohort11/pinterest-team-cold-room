var app = angular.module("PinterestApp", ["ui.bootstrap", "firebase", "ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when('/login-page', {
		templateUrl: 'app/partials/splash-page.html',
		controller: 'loginCtrl'
	})
	// .when('/main-view', {
	// 	templateUrl: 'app/partials/add-view.html',
	// 	controller: 'addNewSongCtrl'
	// })
	.otherwise('/login-page');

}]);