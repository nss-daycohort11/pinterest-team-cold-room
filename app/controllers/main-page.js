// main page
app.controller("mainPageCtrl", ["$http", "$scope", "$firebaseArray", "$firebaseAuth", "$state",
	function($http, $scope, $firebaseArray, $firebaseAuth, $state) {

	// create new firebase ref at their uid location
	var refUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid;
	var userRef = new Firebase(refUrl);
	userRef = $firebaseArray(userRef);

	// create new firebase ref to add to content collection
	var allPinsRef = new Firebase("https://pinterest-cold-room.firebaseio.com/allpins/");
	var pinsRef = $firebaseArray(allPinsRef);

	//create new firebase ref to add to favorites collection under user id
	favesRef = refUrl + "/favorites";
	var favPinsRef = new Firebase(favesRef);
	favPinsRef = $firebaseArray(favPinsRef);

	// add pin to favourites
	$scope.uploadFavsPin = function(pinKey) {
		favPinsRef.$add(pinKey)
			.then(function(refinfo) {
			console.log("what??", refinfo);	
		});
	};

	$scope.allpins = pinsRef;
	console.log("pins ref", pinsRef);
	
	// logout function
	$scope.logout = function() {
		$scope.$parent.ref.$unauth();
		console.log("logging user out");
		$state.go("login-page");
	};


	// search in nav bar
	$scope.submitSearch = function() {
		console.log("you clicked submit search");
		$scope.filtered = [];
		$state.go("main-page.searched-view");

		allPinsRef.on("value", function(snapshot) {
			var pinCollectionRef = snapshot.val();
			$scope.filtered = _.filter(pinCollectionRef, function(obj) {
				if (_.includes(obj.title.toLowerCase(), $scope.searchAllPins.toLowerCase())) {
					console.log("obj includes", obj.title);
					return obj;
				}
			});
			console.log("FilteredArray", $scope.filtered);
		});

	}; //-- end submitSearch()

	// upload a new pin
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