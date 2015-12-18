myDirectives = angular.module('myDirectives', []);

myDirectives.directive('myNav', function() {
	return {
		restrict: 'E',
		templateUrl: '/client/views/myNav.html'
	}
})

myDirectives.directive('loggedInNav', function() {
	return {
		restrict: 'E',
		templateUrl: '/client/views/loggedInNav.html'
	}
})