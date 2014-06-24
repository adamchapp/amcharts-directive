'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ChartController', ['$scope', 'SampleDataService', function ($scope, SampleDataService) {
        if ($scope.chartData == undefined) {
            $scope.chartData = [
                {
                    "year": "2001",
                    "europe": 1.5,
                    "namerica": 1.5,
                    "asia": 4.1,
                    "lamerica": 5.3,
                    "meast": 2.2,
                    "africa": 3.1
                },
                {
                    "year": "2004",
                    "europe": 2.6,
                    "namerica": 6.7,
                    "asia": 1.2,
                    "lamerica": 9.3,
                    "meast": 6.3,
                    "africa": 2.1
                },
                {
                    "year": "2005",
                    "europe": 1.8,
                    "namerica": 3.9,
                    "asia": 0.4,
                    "lamerica": 5.3,
                    "meast": 3.3,
                    "africa": 1.1
                }
            ];
        }

        //mock service - loads data after 1 second delay
        SampleDataService
            .activityData()
            .then(function (data) {
                $scope.chartData = data.chartData;
                $scope.categoryField = data.categoryField;
                $scope.plotAreaBorderAlpha = data.plotAreaBorderAlpha;
            });
    }])

    .controller('MyCtrl2', ['$scope', 'SampleDataService', function ($scope, SampleDataService) {

    }]);
