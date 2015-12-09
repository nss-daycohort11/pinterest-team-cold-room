// login controller
app.controller("loginCtrl", ["$scope", "$firebaseAuth", "$state", "$firebaseArray",
	function($scope, $firebaseAuth, $state, $firebaseArray) {

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
		  $state.go("update-profile");
		}).catch(function(error) {
		  console.error("Error: ", error);
		});
	};

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
	};

	$scope.submitProfileInfo = function() {
		var refUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid;
		var userRef = new Firebase(refUrl);
		userRef = $firebaseArray(userRef);
		var name = {
			username: $scope.nameOfUser
		};
		userRef.$add(name)
		.then(function(refinfo) {
			console.log("refinfo", refinfo);
		});
		$state.go("main-page.content");
	};


}]);