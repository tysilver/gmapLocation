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


myDirectives.directive('loading',   ['$http' ,function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };

}]);