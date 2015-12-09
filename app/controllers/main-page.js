// main page
app.controller("mainPageCtrl", ["$http", "$scope", "$firebaseArray", "$firebaseAuth", "$state", "$location",
	function($http, $scope, $firebaseArray, $firebaseAuth, $state, $location) {

	// create new firebase ref at their uid location
	var userRefUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid;
	var globalUserRef = new Firebase(userRefUrl);
	globalUserRef = $firebaseArray(globalUserRef);


	// create new firebase ref to add to content collection
	var allPinsRef = new Firebase("https://pinterest-cold-room.firebaseio.com/allpins/");
	var pinsRef = $firebaseArray(allPinsRef);

	// add pin to favourites
	$scope.addPinToBoard = function(pinKey) {
		// create new firebase ref at their uid and board location
		var refUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid + "/" + $scope.boardName;
		var userRef = new Firebase(refUrl);
		userRef = $firebaseArray(userRef);

		userRef.$add(pinKey)
		.then(function(refinfo) {
			console.log("refinfo", refinfo);
		});
	};

	// Pinterest button in nav bar to go back to main view
	$scope.goToMainView = function() {
		$state.go('main-page.content');
	};


	$scope.allpins = pinsRef;
	console.log("pins ref", pinsRef);

	$scope.nameOfUser = globalUserRef.$value;
	console.log("name of user", globalUserRef);

	// logout function
	$scope.logout = function() {
		$scope.$parent.ref.$unauth();
		console.log("logging user out");
		$state.go("login-page");
	};

	// search in nav bar
	$scope.submitSearch = function() {
		console.log("you clicked submit search");

		$scope.filtered = _.filter(pinsRef, function(obj) {
			if (_.includes(obj.title.toLowerCase(), $scope.searchAllPins.toLowerCase())) {
				console.log("obj includes", obj.title);
				return obj;
			}
		});
		// $location.path('/main-page/main-page-search')
		$state.transitionTo("main-page.searched-view");
		console.log("FilteredArray", $scope.filtered);

	}; //-- end submitSearch()




	// ----------- upload a new pin ------------ //
	$scope.uploadPin = function() {
		// create new firebase ref at their uid and board location
		var refUrl = "https://pinterest-cold-room.firebaseio.com/users/" + $scope.$parent.userAuthData.uid + "/" + $scope.boardName;
		var userRef = new Firebase(refUrl);
		userRef = $firebaseArray(userRef);

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


	// ----------- view user profile ------------ //
	$scope.userProfile = function() {

		$state.go("main-page.user-profile");
	};



}]); // ------- END APP CONTROLLER



