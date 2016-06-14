'use strict';
angular.module('App', [
  'nvd3',
  'controllers',
  'filters'
])
.constant('API_ROUTE', (function() {
  return 'http://api.openweathermap.org/data/2.5/forecast/';
})())
.constant('OPTION', (function() {
    return {
      API_KEY: '2daf8df3ff92cb619895b915fbc1bd19'
    }
  })());

angular.module('controllers', [])
  .controller('myWeatherCtrl', ['$http', '$scope', '$filter', 'API_ROUTE', 'OPTION', function($http, $scope, $filter, API_ROUTE, OPTION) {
    $scope.options = {
      chart: {
        type: 'discreteBarChart',
        height: 300,
        margin: {
          top: 20,
          right: 20,
          bottom: 80,
          left: 55
        },
        "color": [
          "#607d8b",
        ],
        x: function(d) {
          var _date = $filter('date')(new Date(d.dt_txt), 'MMM d, HH:mm');
          return _date;
        },
        y: function(d) {
          return d.main.temp;
        },
        xAxis: {
          rotateLabels: -30
        },
        duration: 500,
        tooltip: {
          contentGenerator: function(e) {
            var series = e.series[0];
            if (series.value === null) return;

            var rows =
              "<tr>" +
              "<td class='key'>" + 'Temperature: ' + "</td>" +
              "<td class='x-value'>" + (series.value ? series.value.toFixed(2) : 0) + "</td>" +
              "</tr>";

            var header =
              "<thead>" +
              "<tr>" +
              "<td class='key'><strong>" + series.key + "</strong></td>" +
              "</tr>" +
              "</thead>";

            return "<table>" +
              header +
              "<tbody>" +
              rows +
              "</tbody>" +
              "</table>";
          }
        }
      }
    };

    $scope.getWeather = function(idCity) {
      $http({
        method: 'GET',
        url: API_ROUTE + 'city?id=' + idCity + '&units=metric&cnt=10&dt_txt=UTC&APPID=' + OPTION.API_KEY
      }).then(function successCallback(response) {
        $scope.data = [{
          values: response.data.list
        }];
        $scope.data_weather = response.data.list;
        console.log(response);
      }, function errorCallback(response) {

      })
    }

    $scope.selectCity = 702550;
    $scope.cities = [
      { name: "Lviv", id: 702550 },
      { name: "Kiev", id: 703448 },
      { name: "Odessa", id: 698740 }
    ];

    $scope.update = function() {
      $scope.getWeather($scope.selectCity);
    }

    $scope.getWeather($scope.selectCity);
  }]);

angular.module('filters', [])
  .filter('filterDate', ['$filter', function($filter) {
    return function(input) {
      var _date = $filter('date')(new Date(input), 'MMM d, HH:mm');
      return _date;
    };
  }]);
