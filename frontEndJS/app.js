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
    $scope.records = [];

    $http.get("http://localhost:4000/records").success(function(data) {
        $scope.records = data;
    });

    $scope.deleteRecord = function(id) {
        $http.get(`http://localhost:4000/records/delete/${id}`);
    };
});

recordApp.controller('createController', function($scope, $http, $window) {
    $scope.message = 'create controller on deck son';
    $scope.newRecord = null;

    $scope.saveRecord = function() {
        const record = {
            title: $scope.newRecord.title,
            artist: $scope.newRecord.artist,
            genre: $scope.newRecord.genre,
            rating: $scope.newRecord.rating
        };

        $http.post(`http://localhost:4000/records/add`, record).success(function() {
            $window.location.href = '/list';
        })
    }
});