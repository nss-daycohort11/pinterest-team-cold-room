// login controller
app.controller("loginCtrl", ["$window", "$location", "$scope", "$firebaseAuth", function($window, $location, $scope, $firebaseAuth) {

	var ref = new Firebase("https://pinterest-cold-room.firebaseio.com/users");

	$scope.ref = $firebaseAuth(ref);

	var authData = $scope.ref.$getAuth();

	if (authData) {
	  console.log("Logged in as:", authData.uid);
	  $location.path('/main-page').replace();
	} else {
	  console.log("Logged out");
	}
		

	$scope.registerUser = function() {
		var userObj = {
			email: $scope.email,
			password: $scope.password
		};
		console.log("userObj", userObj);

		$scope.ref.$createUser(userObj)
		.then(function(userData) {
		  console.log("User " + userData.uid + " created successfully!");
		  return $scope.ref.$authWithPassword(userObj);
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $location.path('/main-page').replace();
		}).catch(function(error) {
		  console.error("Error: ", error);
		});
	}

	$scope.login = function() {
		var userObj = {
			email: $scope.email,
			password: $scope.password
		};

		$scope.ref.$authWithPassword(userObj)
		.then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $location.path('/main-page').replace();
		}).catch(function(error) {
		  console.error("Error: ", error);
		});;
	}


}]);