myApp.controller('profileCtrl', ['$scope', '$location', 'userFactory', 'mapsFactory', 'geolocationSvc', '$http', function ($scope, $location, userFactory, mapsFactory, geolocationSvc, $http){
	userFactory.getCurrentUser(function(data){
		$scope.current_user = data;
	})

	$scope.markers = [
        {
           "latitude":33.22,
           "longitude":35.33
        }
    ];
  
    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
        
    }

    mapsFactory.getAllLocations(function (data) {
        for (var i = 0; i < data.length; i++) {
            createMarker(data[i])
        }
    })
    

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
}])