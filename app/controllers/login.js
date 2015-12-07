// login controller
app.controller("loginCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {

	$scope.ref = new Firebase("https://pinterest-cold-room.firebaseio.com/users");

	
	
	$scope.ref.$createUser({
	  email: $scope.email,
	  password: $scope.password
	}).then(function(userData) {
	  console.log("User " + userData.uid + " created successfully!");

	  return $scope.ref.$authWithPassword({
	    email: $scope.email,
	    password: $scope.password
	  });
	}).then(function(authData) {
	  console.log("Logged in as:", authData.uid);
	}).catch(function(error) {
	  console.error("Error: ", error);
	});

}]);