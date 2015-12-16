myApp.factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

    var factory = {}
    current_position = ""

    factory.giveCurrentPosition = function(callback) {
        getCurrentPosition(function(data){
            callback(data)
        })
    }

    getCurrentPosition = function(callback) {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
            return;
        }

        $window.navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log("This is happening in the geolocationSvc")
                console.log(position)
                callback(position)
                console.log("Finished logging geolocationSvc")
                current_position = position
                deferred.resolve(position);
            },
            function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    return factory
}]);