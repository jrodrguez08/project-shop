var app = angular.module('Shop', ['ngRoute', 'ngAnimate']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '../pages/home.html',
            controller: 'catalogController'
        })
        .when('/', {
            templateUrl: '../pages/home.html',
            controller: 'catalogController'
        })
        .when('/qs', {
            templateUrl: '../pages/qs.html'
        })
        .when('/contacto', {
            templateUrl: '../pages/contacto.html'
        })
        .when('/checkout', {
            templateUrl: '../pages/checkout.html',
            controller: 'catalogController'
        })
        .when('/cart', {
            templateUrl: '../pages/cart.html',
            controller: 'catalogController'
        })
        .when('/catalogo', {
            templateUrl: '../pages/catalogo.html',
            controller: 'catalogController'
        });
});

app.factory('DataService', function () {
    var cart = [];

    return {
        addToCart: function (book) {
            var found = false;
            cart.forEach(function (item) {
                if (item.id === book.id) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                cart.push(angular.extend({
                    quantity: 1
                }, book));
            }
        },
        removeFromCart: function (item) {
            var index = cart.indexOf(item);
            cart.splice(index, 1);
        },
        getCartPrice: function () {
            var total = 0;
            cart.forEach(function (product) {
                total += product.price * product.quantity;
            });
            return total;
        },
        getCart: function () {
            return cart;
        },
        getCartText: function () {
            var text = '';
            angular.forEach(cart, function (item) {
                text = text + 'x' + item.quantity + ' ' + '-' + ' ' + item.title + '\n';
            });
            return text;
        }
    }
});

app.controller('catalogController', function ($scope, $http, DataService) {
    $scope.cart = DataService.getCart();
    $scope.bookStore = {
        selected: {},
        books: null
    };
    $scope.myInterval = 3000;


    $http.get('json/books.json')
        .success(function (data) {
            console.log(data);
            $scope.bookStore.books = data;
        })
        .error(function (err) {

        });

    $scope.addToCart = function (book) {
        DataService.addToCart(book);
        $scope.cart = DataService.getCart();
        console.log(book);
    };

    $scope.removeFromCart = function (item) {
        DataService.removeFromCart(item);
        $scope.cart = DataService.getCart();
        console.log(item);
    };

    $scope.getCartPrice = function () {
        return DataService.getCartPrice();
    };

    $scope.getCartText = function () {
        return DataService.getCartText();
    };

    $scope.getBookPrice = function (item) {
        return (item.quantity * item.price);
    }


});