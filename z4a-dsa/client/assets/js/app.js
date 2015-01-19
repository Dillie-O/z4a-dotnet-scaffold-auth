(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
	 'LocalStorageModule',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];
  run.$inject = ['AuthService'];

  function config($urlProvider, $locationProvider, $httpProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    $httpProvider.interceptors.push('AuthInterceptorService');
  }

  function run(authService) {
  	FastClick.attach(document.body);
  	authService.fillAuthData();
  }

})();
