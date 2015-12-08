app.controller("getAuthData", ["$location", "$scope", "$firebaseAuth", function($location, $scope, $firebaseAuth) {

	var ref = new Firebase("https://pinterest-cold-room.firebaseio.com/users");

	$scope.ref = $firebaseAuth(ref);

	var authData = $scope.ref.$getAuth();

	$scope.userAuthData = authData;

	if (authData) {
	  console.log("Logged in as:", authData.uid);
	  $location.path('/main-page/main-page-content').replace();
	} else {
	  console.log("Logged out");
	  $location.path('/login-page').replace();
	}
		
}]);