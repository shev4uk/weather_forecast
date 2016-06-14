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
