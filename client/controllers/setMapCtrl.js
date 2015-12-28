myApp.controller('setMapCtrl', ['$scope', '$http', '$window', 'geolocationSvc', 'mapsFactory', 'userFactory', '$compile', '$location', function ($scope, $http, $window, geolocationSvc, mapsFactory, userFactory, $compile, $location) {
    // $scope.geolocation = geolocationSvc.getCurrentPosition().then(console.log("We found the geolocation"))
    // console.log($scope.geolocation)
    if (!$window.isLoggedIn) {
        $location.path('/login')
    } else {
        $scope.title = "My Place"
        userFactory.getCurrentUser(function(data){
            $scope.current_user = data;
        })

        var mapOptions = {};
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();

        document.getElementById('map').style.height = "400px";
        document.getElementById('map').style.width = "300px";

        geolocationSvc.giveCurrentPosition(function(data){
            $scope.position = data.coords

            mapOptions = {
                zoom: 3,
                center: {lat: $scope.position.latitude + 10, lng: $scope.position.longitude},
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                }
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $(window).resize(function() {
                // (the 'map' here is the result of the created 'var map = ...' above)
                google.maps.event.trigger($scope.map, "resize");
              });

            createMarker({title: "You are here!", lat: $scope.position.latitude, long: $scope.position.longitude, desc: "Drag this to your current location, then share with the world what you are doing!"})
        })
        
        var createMarker = function (info){
            
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.title,
                draggable: true
            });

            google.maps.event.addListener(marker, 'click', function(){
                var content = '<div style="width: 200px" class="infoWindowContent"><p>' + info.desc + '</p></div>';
                var compiled = $compile(content)($scope)
                $scope.$apply()
                infoWindow.setContent(compiled[0]);
                infoWindow.open($scope.map, marker);
            });

            google.maps.event.addListener(marker, 'dragend', function(evt){
                var content = '<div style="width: 200px" class="infoWindowContent"><p>' + info.desc + '</p></div>';
                var compiled = $compile(content)($scope)
                $scope.$apply()
                infoWindow.setContent(compiled[0]);

                console.log(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3))
                $scope.position = {latitude: evt.latLng.lat().toFixed(3), longitude: evt.latLng.lng().toFixed(3)}
                infoWindow.open($scope.map, marker);
            });
            
            $scope.markers.push(marker);
            google.maps.event.trigger( marker, 'click' );
            
        };

        $scope.addStatus = function(){
            if (!$scope.currentStatus.favorite) {
                $scope.currentStatus.favorite = false;
            }
            if (!$scope.currentStatus.text) {
                $scope.currentStatus.text = "No text entered."
            }
            if (!$scope.currentStatus.type) {
                $scope.currentStatus.type = "none"
            }
            if (!$scope.currentStatus.visible) {
                $scope.currentStatus.visible = "you"
            }
            var placeInfo = {user: $scope.current_user, visible: $scope.currentStatus.visible, favorite: $scope.currentStatus.favorite, type: $scope.currentStatus.type, status: $scope.currentStatus.text, created_at: new Date(), lat: $scope.position.latitude, long: $scope.position.longitude}
            var d = new Date(placeInfo.created_at);
            placeInfo.dateString = setDate(d);
            mapsFactory.setUserLocation(placeInfo, function(){
                userFactory.updateCurrentUser(function(){
                    $location.path('/dashboard/all')
                })
            })
        };

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };

        $scope.logout = function() {
            userFactory.logout(function (data){
                $window.isLoggedIn = false;
                $location.path('/login')
            })
        }
    }
}]);