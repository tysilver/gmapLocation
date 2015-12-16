var myMain = angular.module('myMain', ['ngRoute', 'uiGmapgoogle-maps'])

myMain.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        // .when('/',{
        //  templateUrl: '/client/views/view1.html',
        //  controller: 'setMapCtrl'
        // })
        // .when('/setMap',{
        //  templateUrl: '/client/views/view2.html',
        //  controller: 'mapCtrl'
        // })
        .when('/',{
            templateUrl: '/client/views/view3.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myMain.controller('mainCtrl', function ($scope) {

    angular.extend($scope, {
        map: {
            center: {
                latitude: 42.3349940452867,
                longitude:-71.0353168884369
            },
            zoom: 11,
            markers: [],
            events: {
            click: function (map, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var lat = e.latLng.lat(),lon = e.latLng.lng();
                var marker = {
                    id: Date.now(),
                    coords: {
                        latitude: lat,
                        longitude: lon
                    }
                };
                $scope.map.markers.push(marker);
                console.log($scope.map.markers);
                $scope.$apply();
            }
        }
        }
    });
});