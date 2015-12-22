myApp.controller('profileCtrl', ['$scope', '$location', '$routeParams', 'userFactory', 'mapsFactory', 'geolocationSvc', '$http', function ($scope, $location, $routeParams, userFactory, mapsFactory, geolocationSvc, $http){
	userFactory.getCurrentUser(function(data){
		$scope.current_user = data;
		console.log("And the current user is: ")
		console.log($scope.current_user)
		mapsFactory.getCurrentUserLocations($scope.current_user, $routeParams.myView, function (data, title) {
	        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	        $scope.title = title;
            $scope.currentLocations = data;
	        for (var i = 0; i < data.length; i++) {
	            createMarker(data[i]);
	        }
	    })
	})

	$scope.markers = [
        
    ];

    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(39.596, -97.21),
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
        
    }

    var toggleCount = 0;

    $scope.toggleList = function(){
        toggleCount += 1;
        if (toggleCount % 2 == 1) {
            document.getElementById("map").style.display = "none";
            document.getElementById("toggleList").style.display = "block";
            document.getElementById("profileToggle").innerHTML = "Back to Map";
        } else {
            document.getElementById("toggleList").style.display = "none";
            document.getElementById("map").style.display = "block";
            document.getElementById("profileToggle").innerHTML = "View as List";
        }
    }
    

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
}])