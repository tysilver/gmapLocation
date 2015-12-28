var myApp = angular.module('myApp', ['ngRoute', 'myDirectives', 'ngCookies']);

myApp.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',{
			templateUrl: '/client/views/main.html',
			controller: 'mainCtrl'
		})
		.when('/login',{
			templateUrl: '/client/views/login.html',
			controller: 'loginCtrl'
		})
		.when('/signup',{
			templateUrl: '/client/views/signUp.html',
			controller: 'signupCtrl'
		})
		.when('/dashboard/:myView',{
			templateUrl: '/client/views/dashboard.html',
			controller: 'dashboardCtrl'
		})
		.when('/setMap',{
			templateUrl: '/client/views/view2.html',
			controller: 'setMapCtrl'
		})
		.when('/viewMap',{
			templateUrl: '/client/views/view3.html',
			controller: 'mapCtrl'
		})
		.when('/location/view/:placeId',{
			templateUrl: '/client/views/viewPlace.html',
			controller: 'viewPlaceCtrl'
		})
		.when('/location/edit/:placeId',{
			templateUrl: '/client/views/editPlace.html',
			controller: 'editPlaceCtrl'
		})
		.when('/location/edit/:placeId',{
			templateUrl: '/client/views/editPlace.html',
			controller: 'editPlaceCtrl'
		})
		// .when('/profile',{
		// 	templateUrl: '/client/views/profile.html',
		// 	controller: 'profileCtrl'
		// })
		.otherwise({
			redirectTo: '/'
		});
});