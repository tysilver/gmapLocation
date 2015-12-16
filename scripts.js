var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',{
			templateUrl: '/client/views/view1.html',
			controller: 'userCtrl'
		})
		.when('/profile',{
			templateUrl: '/client/views/profile.html',
			controller: 'profileCtrl'
		})
		.when('/setMap',{
			templateUrl: '/client/views/view2.html',
			controller: 'setMapCtrl'
		})
		.when('/viewMap',{
			templateUrl: '/client/views/view3.html',
			controller: 'mapCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});