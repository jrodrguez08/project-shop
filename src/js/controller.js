var app = angular.module("Shop", []);
app.controller("catalogController", function ($scope, $http) {
    $scope.nombre = "heredia";
    $scope.bookStore = {
        selected: {},
        books: null
    };
    $scope.cart = [];
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

});