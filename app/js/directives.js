'use strict';

/* Directives */

angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('amChart', function() {
        return {
            restrict: "E",
            transclude: true,
//            scope: {},
            controller: function($scope) {
                this.addGraph = function(graph) {
                    $scope.chart.addGraph(graph);
                }

                this.validateData = function() {
                    $scope.chart.validateData();
                    $scope.chart.validateNow();
                }
            },
            template: "<div id='chart'></div>",
            link: function(scope, element, attrs) {
                var chart = new AmCharts.AmSerialChart();
                chart.categoryField = "year";
                chart.plotAreaBorderAlpha = 1;

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.gridAlpha = 0.1;
                categoryAxis.axisAlpha = 0;
                categoryAxis.gridPosition = "start";

//                var graph = new AmCharts.AmGraph();
//                graph.title = "Europe";
//                graph.labelText = "[[value]]";
//                graph.valueField = "europe";
//                graph.type = "column";
//                graph.lineAlpha = 0;
//                graph.fillAlphas = 1;
//                graph.lineColor = "#C72C95";
//                graph.balloonText = "<span style='color:#555555;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";
//                chart.addGraph(graph);

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.stackType = "regular";
                valueAxis.gridAlpha = 0.1;
                valueAxis.axisAlpha = 0;
                chart.addValueAxis(valueAxis);

                // LEGEND
                var legend = new AmCharts.AmLegend();
                legend.borderAlpha = 0.2;
                legend.horizontalGap = 10;
                chart.addLegend(legend);

                chart.write("chart");

                scope.chart = chart;

                scope.$watch('chartData', function(val) {
                    if (val == undefined || val == null) return;
                    chart.dataProvider = val;
                    chart.validateData();
                });

                scope.$watch('categoryField', function(val) {
                    if (val == undefined || val == null) return;
                    chart.categoryField = val;
                    chart.validateData();
                });

                scope.$watch('plotAreaBorderAlpha', function(val) {
                    if (val == undefined || val == null) return;
                    chart.plotAreaBorderAlpha = val;
                    chart.validateNow();
                });
            }
        };
    })

    .directive('amGraph', function() {

        return {
            restrict: "E",
            require: "^amChart",
            replace: true,
            link: function(scope, element, attrs, amChartController) {
                console.log('link');
                var graph = new AmCharts.AmGraph();
                graph.title = "Europe";
                graph.labelText = "[[value]]";
                graph.valueField = "europe";
                graph.type = "column";
                graph.lineAlpha = 0;    
                graph.fillAlphas = 1;
                graph.lineColor = "#C72C95";
//                graph.balloonText = "<span style='color:#555555;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";

                //add to parent via controller
                amChartController.addGraph(graph);
//
//                $scope.$watch('title', function(val) {
//                    graph.title = val;
//                    amChartController.validateData();
//                });
//
//                $scope.$watch('labelText', function(val) {
//                    graph.labelText = val;
//                    amChartController.validateData();
//                });
//
//                $scope.$watch('valueField', function(val) {
//                    graph.valueField = val;
//                    amChartController.validateData();
//                });
//                $scope.$watch('type', function(val) {
//                    graph.type = val;
//                    amChartController.validateData();
//                });
//                $scope.$watch('lineAlpha', function(val) {
//                    graph.lineAlpha = val;
//                    amChartController.validateData();
//                });
//                $scope.$watch('fillAlphas', function(val) {
//                    graph.fillAlphas = val;
//                    amChartController.validateData();
//                });
//                $scope.$watch('balloonText', function(val) {
//                    graph.balloonText = val;
//                    amChartController.validateData();
//                });
            }
        };
    });