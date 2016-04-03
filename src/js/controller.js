var app = angular.module("Shop", []);
app.controller("catalogController", function ($scope, $http) {
    $scope.nombre = "heredia";
    $scope.bookStore = {
        selected: {},
        books: null
    };
    $http.get("json/books.json")
        .success(function (data) {
            console.log(data);
            $scope.bookStore.books = data;
        })
        .error(function (err) {

        });
});