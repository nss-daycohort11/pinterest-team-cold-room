// login controller
app.controller("loginCtrl", ["$scope", "$firebaseAuth", "$state",
	function($scope, $firebaseAuth, $state) {

	$scope.registerUser = function() {
		var userObj = {
			email: $scope.email,
			password: $scope.password
		};
		console.log("userObj", userObj);

		$scope.$parent.ref.$createUser(userObj)
		.then(function(userData) {
		  console.log("User " + userData.uid + " created successfully!");
		  return $scope.ref.$authWithPassword(userObj);
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $state.go("main-page.content");
		}).catch(function(error) {
		  console.error("Error: ", error);
		});
	}

	$scope.login = function() {
		var userObj = {
			email: $scope.email,
			password: $scope.password
		};

		$scope.$parent.ref.$authWithPassword(userObj)
		.then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $state.go("main-page.content");
		}).catch(function(error) {
		  console.error("Error: ", error);
		});;
	}


}]);