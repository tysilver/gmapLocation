myApp.controller('profileCtrl', ['$scope', '$location', 'userFactory', 'mapsFactory', 'geolocationSvc', '$http', function ($scope, $location, userFactory, mapsFactory, geolocationSvc, $http){
	userFactory.getCurrentUser(function(data){
		$scope.current_user = data;
	})
}])