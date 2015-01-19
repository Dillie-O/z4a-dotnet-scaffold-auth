angular.module('application')
	.factory('AuthService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

	var serviceBase = 'http://YOUR_URL_BASE/';
	var authServiceFactory = {};

	var _authentication = {
		isAuth: false,
		userName: ""
	};

	var _saveRegistration = function (registration) {

		_logOut();

		return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
			return response;
		});

	};

	var _login = function (loginData) {

		var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

		var deferred = $q.defer();

		$http.post(serviceBase + 'api/account/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

			localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

			_authentication.isAuth = true;
			_authentication.userName = loginData.userName;

			deferred.resolve(response);

		}).error(function (err, status) {
			_logOut();
			deferred.reject(err);
		});

		return deferred.promise;

	};

	var _logOut = function () {

		localStorageService.remove('authorizationData');

		_authentication.isAuth = false;
		_authentication.userName = "";

	};

	var _fillAuthData = function () {

		var authData = localStorageService.get('authorizationData');
		if (authData) {
			_authentication.isAuth = true;
			_authentication.userName = authData.userName;
		}

	}

	authServiceFactory.saveRegistration = _saveRegistration;
	authServiceFactory.login = _login;
	authServiceFactory.logOut = _logOut;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.authentication = _authentication;

	return authServiceFactory;
}]);

angular.module('application')
	.factory('AuthInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

	var authInterceptorServiceFactory = {};

	var _request = function (config) {

		config.headers = config.headers || {};

		var authData = localStorageService.get('authorizationData');
		if (authData) {
			config.headers.Authorization = 'Bearer ' + authData.token;
		}

		return config;
	}

	var _responseError = function (rejection) {
		if (rejection.status === 401) {
			$location.path('/login');
		}
		return $q.reject(rejection);
	}

	authInterceptorServiceFactory.request = _request;
	authInterceptorServiceFactory.responseError = _responseError;

	return authInterceptorServiceFactory;
}]);
