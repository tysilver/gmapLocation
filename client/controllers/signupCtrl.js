myApp.controller('signupCtrl', ['$scope', '$location', '$window', 'userFactory', '$http', function ($scope, $location, $window, userFactory, $http){
	$scope.addUser = function (){
        if (!$scope.newUser.name || !$scope.newUser.email || !$scope.newUser.password) {
            $scope.message = "Name, email and password fields must be entered."
        } else if ($scope.newUser.password.length < 8 ) {
            $scope.message = "Password must be at least 8 characters."
        } else {
            $scope.newUser.created_at = new Date();
            userFactory.addUser($scope.newUser, function (data){
                if (data.message) {
                    $scope.message = (data.message);
                } else {
                    $scope.newUser = {};
                    $window.isLoggedIn = true;
                    $location.path('/dashboard/all')
                }
            });
        }
    };
}])