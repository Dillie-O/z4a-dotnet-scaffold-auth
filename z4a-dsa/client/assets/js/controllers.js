angular.module('application')
	.controller('IndexController', ['$scope', '$location', 'AuthService', function ($scope, $location, authService) {

	$scope.logOut = function () {
		authService.logOut();
		$location.path('/home');
	}

	$scope.authentication = authService.authentication;

}]);

angular.module('application')
	.controller('NewsController', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http)
	{
		$scope.newsTime = 'Not retrieved yet.';
		$scope.getTime = function () {

			var responsePromise = $http.get("/api/info");

			responsePromise.success(function (data, status, headers, config) {
				$scope.newsTime = data;
			});

			responsePromise.error(function (data, status, headers, config) {
				$scope.newsTime = 'Failed to get time: ' + data;
			});
		};
	}
]);

angular.module('application')
	.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', function ($scope, $location, $timeout, authService)
	{
	$scope.savedSuccessfully = false;
	$scope.message = "";

	$scope.registration = {
		userName: "",
		password: "",
		confirmPassword: ""
	};

	$scope.signUp = function () {

		authService.saveRegistration($scope.registration).then(function (response) {

			$scope.savedSuccessfully = true;
			$scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
			startTimer();

		},
		 function (response) {
		 	var errors = [];
		 	for (var key in response.data.modelState) {
		 		for (var i = 0; i < response.data.modelState[key].length; i++) {
		 			errors.push(response.data.modelState[key][i]);
		 		}
		 	}
		 	$scope.message = "Failed to register user due to:" + errors.join(' ');
		 });
	};

	var startTimer = function () {
		var timer = $timeout(function () {
			$timeout.cancel(timer);
			$location.path('/login');
		}, 2000);
	}

}]);

angular.module('application')
	.controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, authService)
	{

	$scope.loginData = {
		userName: "",
		password: ""
	};

	$scope.message = "";

	$scope.login = function () {

		authService.login($scope.loginData).then(function (response) {

			$location.path('/orders');

		},
		 function (err) {
		 	$scope.message = err.error_description;
		 });
	};

}]);
