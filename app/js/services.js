'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .value('version', '0.1')
    .factory('SampleDataService', function($q, $timeout) {
        var activityData = function() {

            var response = {};
            response.categoryField = 'year';
            response.plotAreaBorderAlpha = 0.2;
            response.chartData = [
                {
                    "year": "2003",
                    "europe": 2.5
                },
                {
                    "year": "2004",
                    "europe": 1.6
                },
                {
                    "year": "2005",
                    "europe": 2.8
                }
            ];

            //create a promise then resolve it after a timeout of 1 second
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(response);
            }, 1000);

            return deferred.promise;
        };

        return {
            activityData: activityData
        };
    });
