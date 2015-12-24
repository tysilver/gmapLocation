myApp.controller('viewPlaceCtrl', ['$scope', '$http', '$routeParams', '$location', 'geolocationSvc', 'mapsFactory', 'userFactory', function ($scope, $http, $routeParams, $location, geolocationSvc, mapsFactory, userFactory) {
    userFactory.getCurrentUser(function(data){
        $scope.current_user = data;
        console.log($scope.current_user)
    })
    $scope.markers = [];
  
    var mapOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    document.getElementById('map').style.height = "300px";
    document.getElementById('map').style.width = "300px";
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long)
        });

        marker.content = '<div class="infoWindowContent" style="width: 150px"><p>' + info.status + '</p><p>' + info.dateString + '</p></div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);

        google.maps.event.trigger( marker, 'click' );
        
    }  

    mapsFactory.getOneLocation($routeParams.placeId, function (data) {
        $scope.currentLocation = data;
        mapOptions.center = new google.maps.LatLng(data.lat, data.long)
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        createMarker(data)
    })

    $scope.deleteLocation = function(){
        var shouldDelete = confirm("Are you sure you want to delete this location? This action cannot be undone.");
        if (shouldDelete == true) {
            mapsFactory.deleteLocation(function(){
                $location.path('/dashboard/all')
            })
        }
    }
    

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
}]);