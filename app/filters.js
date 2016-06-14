angular.module('filters', [])
  .filter('filterDate', ['$filter', function($filter) {
    return function(input) {
      var _date = $filter('date')(new Date(input), 'MMM d, HH:mm');
      return _date;
    };
  }]);
