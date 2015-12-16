myApp.controller('userCtrl', ['$scope', '$location', 'userFactory', '$http', function ($scope, $location, userFactory, $http){
	$scope.addUser = function(){
		$scope.newUser.created_at = new Date()
		userFactory.addUser($scope.newUser, function(){
			$location.path('/profile')
		})
	}
}])