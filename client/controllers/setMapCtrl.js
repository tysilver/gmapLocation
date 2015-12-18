myApp.controller('setMapCtrl', ['$scope', '$http', 'geolocationSvc', 'mapsFactory', 'userFactory', '$compile', '$location', function ($scope, $http, geolocationSvc, mapsFactory, userFactory, $compile, $location) {
    // $scope.geolocation = geolocationSvc.getCurrentPosition().then(console.log("We found the geolocation"))
    // console.log($scope.geolocation)


    userFactory.getCurrentUser(function(data){
        $scope.current_user = data;
    })

    var mapOptions = {};
    $scope.markers = [
        {
           "latitude":37.8258152,
           "longitude":-122.0104342
        }
    ];
    var infoWindow = new google.maps.InfoWindow();

    geolocationSvc.giveCurrentPosition(function(data){
        console.log("We got back here")
        console.log(data.coords)
        $scope.position = data.coords

        mapOptions = {
            zoom: 3,
            center: {lat: $scope.position.latitude, lng: $scope.position.longitude},
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

        createMarker({city: "You are here!", lat: $scope.position.latitude, long: $scope.position.longitude, desc: "Drag this to your current location, then share with the world what you are doing!"})

        console.log("Over")
    })
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city,
            draggable: true
        });

        google.maps.event.addListener(marker, 'click', function(){
            var content = '<div style="width: 200px" class="infoWindowContent"><p>' + info.desc + '</p><form id="myForm"><input type="text" ng-model="currentStatus.text"><button ng-click="addStatus()">Submit</button></form></div>';
            var compiled = $compile(content)($scope)
            $scope.$apply()
            infoWindow.setContent(compiled[0]);
            infoWindow.open($scope.map, marker);
        });

        google.maps.event.addListener(marker, 'dragend', function(evt){
            var content = '<div style="width: 200px" class="infoWindowContent"><p>' + info.desc + '</p><form id="myForm"><input type="text" ng-model="currentStatus.text"><button ng-click="addStatus()">Submit</button></form></div>';
            var compiled = $compile(content)($scope)
            $scope.$apply()
            infoWindow.setContent(compiled[0]);

            console.log(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3))
            $scope.position = {latitude: evt.latLng.lat().toFixed(3), longitude: evt.latLng.lng().toFixed(3)}
            console.log($scope.position);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        console.log(mapOptions.center)
        google.maps.event.trigger( marker, 'click' );
        
    };

    $scope.addStatus = function(){
        console.log("Got to the addStatus method")
        var placeInfo = {user: $scope.current_user, status: $scope.currentStatus.text, created_at: new Date(), lat: $scope.position.latitude, long: $scope.position.longitude}
        var d = new Date(placeInfo.created_at);
        placeInfo.dateString = setDate(d);
        mapsFactory.setUserLocation(placeInfo, function(){
            console.log("We got back some data!")
            userFactory.updateCurrentUser(function(){
                $location.path('/viewMap')
            })
        })
    };

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    };
}]);