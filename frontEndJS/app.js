var recordApp = angular.module('recordApp', ['ngRoute']);

recordApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
        templateUrl: 'pages/list.html',
        controller: 'listController'
    })

    .when('/create', {
        templateUrl: 'pages/create.html',
        controller: 'createController'
    })

    .otherwise({ redirectTo: '/' });
});

recordApp.controller('listController', function($scope, $http) {
    $scope.message = 'list controller on deck son';
    $scope.records = [];

    $http.get("http://localhost:4000/records").success(function(data) {
        $scope.records = data;
    });
});

recordApp.controller('createController', function($scope) {
    $scope.message = 'create controller on deck son';

    $scope.saveRecord = function() {
        $scope.newRecord = null;
        let record = {
            title: newRecord.title,
            artist: newRecord.artist,
            genre: newRecord.genre,
            rating: newRecord.rating,
        }
        console.log(record);
    }
});