var app = angular.module("Shop", []);
app.controller("catalogController", function ($scope, $http) {
    $scope.nombre = "heredia";
    $scope.books = [];
    $http.get("json/books.json")
        .success(function (data) {
            console.log(data);
            $scope.books = data;
        })
        .error(function (err) {

        });
});