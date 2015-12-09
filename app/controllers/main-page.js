// main page
app.controller("mainPageCtrl", ["$http", "$scope", "$firebaseArray", "$firebaseAuth", "$state",
	function($http, $scope, $firebaseArray, $firebaseAuth, $state) {

	// create new firebase ref at their uid location
	var refUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid;
	var userRef = new Firebase(refUrl);
	userRef = $firebaseArray(userRef);

	// create new firebase ref to add to content collection
	var pinsRef = new Firebase("https://pinterest-cold-room.firebaseio.com/allpins/");
	pinsRef = $firebaseArray(pinsRef);

	//create new firebase ref to add to favorites collection under user id
	favesRef = refUrl + "/" + $scope.boardName;
	var favPinsRef = new Firebase(favesRef);
	favPinsRef = $firebaseArray(favPinsRef);

	// $scope.uploadFavsPin = function(pinKey) {
	// 	favPinsRef.$add(pinKey)
	// 		.then(function(refinfo) {
	// 		console.log("what??", refinfo);	
	// 	});
	// };

	$scope.allpins = pinsRef;

	$scope.logout = function() {
		$scope.$parent.ref.$unauth();
		console.log("logging user out");
		$state.go("login-page");
	};

	$scope.submitSearch = function() {
		console.log("you clicked submit search");
	};

	$scope.uploadPin = function() {
		$scope.urlToSearch = $scope.url;
		console.log("url", $scope.url);
		$http.get("http://api.embed.ly/1/extract?key=514b5e76363e48c7892110e2bd33a491&url=" + $scope.urlToSearch + "&maxwidth=500")
		.then(function(data) {
			console.log("data", data);
			// create object for upload with relevant info
			var dataForFirebase = {
				description: data.data.description,
				images: data.data.images,
				url: data.data.original_url,
				title: data.data.title
			};
			userRef.$add(dataForFirebase)
			.then(function(refinfo) {
				console.log("refinfo", refinfo);
				pinsRef.$add(dataForFirebase)
				.then(function(pinsinfo) {
					console.log("pinsinfo", pinsinfo);
				});
			});

		});
	};

}]);