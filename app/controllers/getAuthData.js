app.controller("getAuthData", ["$location", "$scope", "$firebaseAuth", "$state", 
	function($location, $scope, $firebaseAuth, $state) {

	var ref = new Firebase("https://pinterest-cold-room.firebaseio.com/users");

	$scope.ref = $firebaseAuth(ref);

	var authData = $scope.ref.$getAuth();

	$scope.userAuthData = authData;

	if (authData) {
	  console.log("Logged in as:", authData.uid);
	  $state.go('main-page.content');
	} else {
	  console.log("Logged out");
	  $location.path('/login-page').replace();
	}
		
}]);