angular.module('app', []).factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

    'use strict';

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
            return;
        }

        $window.navigator.geolocation.getCurrentPosition(
            function (position) {
                deferred.resolve(position);
            },
            function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
}]);

//PRETEND THERES A CONTROLLER HERE
geolocationSvc.getCurrentPosition().then()
