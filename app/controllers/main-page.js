// main page
app.controller("mainPageCtrl", ["$http", "$scope", "$firebaseArray", function($http, $scope, $firebaseArray) {

	$scope.submitSearch = function() {
		console.log("you clicked submit search");
	};

	$scope.uploadPin = function() {
		$scope.urlToSearch = $scope.url;
		console.log("url", $scope.url);

		$http.get("http://api.embed.ly/1/extract?key=514b5e76363e48c7892110e2bd33a491&url=" + $scope.urlToSearch + "&maxwidth=500")
		.then(function(data) {
			console.log("data", data);
		});
	};


}]);