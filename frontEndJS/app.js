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

recordApp.controller('listController', function($scope, recordFactory) {

    $scope.records = [];

    $scope.getRecords = function() {
        recordFactory.getRecords().success(function(data) {
            $scope.records = data;
        });
    };

    $scope.deleteRecord = function(id) {
        recordFactory.deleteRecord(id).success(function() {
            $scope.getRecords();
        })
    };

    $scope.getRecords();
});

recordApp.controller('createController', function($scope, recordFactory, $window) {
    $scope.newRecord = null;

    $scope.saveRecord = function() {
        const record = {
            title: $scope.newRecord.title,
            artist: $scope.newRecord.artist,
            genre: $scope.newRecord.genre,
            rating: $scope.newRecord.rating
        };

        recordFactory.addRecord(record).success(function() {
            $window.location.href = '/';
        });
    }
});

recordApp.factory('recordFactory', function($http) {
    return {
        getRecords: getRecords,
        deleteRecord: deleteRecord,
        addRecord: addRecord
    }

    function getRecords() {
        return $http.get("http://localhost:4000/records");
    }

    function deleteRecord(id) {
        return $http.get(`http://localhost:4000/records/delete/${id}`);
    }

    function addRecord(record) {
        return $http.post(`http://localhost:4000/records/add/`, record);
    }

});