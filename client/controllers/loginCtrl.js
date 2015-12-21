myApp.controller('loginCtrl', ['$scope', '$location', 'userFactory', '$http', function ($scope, $location, userFactory, $http){
	$scope.loginUser = function(){
        if (!$scope.newVisitor || !$scope.newVisitor.email || !$scope.newVisitor.password) {
            $scope.message = "Email and password fields must be entered."
        } else if ($scope.newVisitor.password.length < 8 ) {
            $scope.message = "Password must be at least 8 characters."
        } else {
            userFactory.login($scope.newVisitor, function (data){
                if (data.message) {
                    $scope.message = (data.message);
                    console.log($scope.message)
                } else {
                    $scope.newVisitor = {};
                    console.log(data)
                    $location.path('/profile/all')
                }
            });
        }
    };
}])