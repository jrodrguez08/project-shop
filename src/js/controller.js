var app = angular.module("Shop", ["ngRoute", "ngStorage"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '../pages/home.html'
        })
        .when('/', {
            templateUrl: '../pages/home.html'
        })
        .when('/qs', {
            templateUrl: '../pages/qs.html',
            controller: 'aboutController'
        })
        .when('/contacto', {
            templateUrl: '../pages/contacto.html'
        })
        .when('/checkout', {
            templateUrl: '../pages/checkout.html',
            controller: 'catalogController'
        })
        .when('/catalogo', {
            templateUrl: '../pages/catalogo.html',
            controller: 'catalogController'
        });
});

app.factory("DataService", function () {
    var cart = [];
    var set = function (data) {
        cart.push(data);
    }
    var get = function () {
        return cart;
    }
    return {
        set: set,
        get: get
    };
});

app.controller("catalogController", function ($scope, $http, $sessionStorage) {
    $sessionStorage.SessionMessage = [];
    $scope.cart = [];
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

    $scope.addToCart = function (book) {
        var found = false;
        $scope.cart.forEach(function (item) {
            if (item.id === book.id) {
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            $scope.cart.push(angular.extend({
                quantity: 1
            }, book));
        }
    };

    $scope.removeFromCart = function (item) {
        var index = $scope.cart.indexOf(item);
        $scope.cart.splice(index, 1);
    };

    $scope.getCartPrice = function () {
        var total = 0;
        $scope.cart.forEach(function (product) {
            total += product.price * product.quantity;
        });
        return total;
    };

    $scope.Test = function (book) {
        console.log($sessionStorage.SessionMessage);
    };

});