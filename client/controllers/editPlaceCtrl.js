myApp.controller('editPlaceCtrl', ['$scope', '$http', '$routeParams', 'geolocationSvc', 'mapsFactory', 'userFactory', '$compile', '$location', function ($scope, $http, $routeParams, geolocationSvc, mapsFactory, userFactory, $compile, $location) {
    // $scope.geolocation = geolocationSvc.getCurrentPosition().then(console.log("We found the geolocation"))
    // console.log($scope.geolocation)
    if (!$window.isLoggedIn) {
        $location.path('/login')
    } else {
        var mapOptions = {};
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();

        document.getElementById('map').style.height = "300px";
        document.getElementById('map').style.width = "300px";


        //FACTORY METHODS

        userFactory.getCurrentUser(function(data){
            $scope.current_user = data;
        })

        var createMarker = function (info){
            
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.title,
                draggable: true
            });

            console.log(marker.position)

            google.maps.event.addListener(marker, 'dragend', function(evt){

                console.log(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3))
                $scope.position = {latitude: evt.latLng.lat().toFixed(3), longitude: evt.latLng.lng().toFixed(3)}
                console.log($scope.position);
            });
            
            $scope.markers.push(marker);
            console.log(mapOptions.center)
        };

        mapsFactory.getOneLocation($routeParams.placeId, function(data){
            console.log("We got back here")
            console.log(data)
            $scope.currentLocation = data

            mapOptions = {
                zoom: 3,
                center: {lat: data.lat, lng: data.long},
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                }
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            console.log(data.type)

            createMarker({title: "Edit this marker!", lat: data.lat, long: data.long, type: data.type, favorite: data.favorite, desc: "You may update this marker and drag to a new location."})

            console.log("Over")
        })

        //SCOPE METHODS

        $scope.updateStatus = function(){
            console.log("Got to the addStatus method")
            console.log("Here is the status: ")
            console.log($scope.currentLocation)
            if (!$scope.currentLocation.favorite) {
                $scope.currentLocation.favorite = false;
            }
            if (!$scope.currentLocation.text) {
                $scope.currentLocation.text = "No text entered."
            }
            if (!$scope.currentLocation.type) {
                $scope.currentLocation.type = "none"
            }
            if (!$scope.currentLocation.visible) {
                $scope.currentLocation.visible = "you"
            }
            console.log($scope.currentLocation.favorite)
            var placeInfo = {_id: $scope.currentLocation._id, visible: $scope.currentLocation.visible, user: $scope.current_user, favorite: $scope.currentLocation.favorite, type: $scope.currentLocation.type, status: $scope.currentLocation.status, updated_at: new Date(), lat: $scope.currentLocation.lat, long: $scope.currentLocation.long}
            mapsFactory.updateUserLocation(placeInfo, function(){
                console.log("We got back some data!")
                mapsFactory.getCurrentUserLocations($scope.current_user, "all", function(places, title){
                	userFactory.updateCurrentUser(function(){
    	                $location.path('/location/view/' + $scope.currentLocation._id)
    	            })
                })
            })
        };

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    }
}]);