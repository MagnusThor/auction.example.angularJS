angular.module("auctionApp", ["ngRoute", "auctionControllers"]);

angular.module("auctionApp").config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.
             when('/find', {
                 templateUrl: '/app/views/find.html',
                 controller: 'findController'
             }).
         when('/register', {
             templateUrl: '/app/views/register.html',
             controller: 'registerController'
         }).
       when('/home', {
           templateUrl: '/app/views/home.html',
           controller: 'homeController'
       }).
         when('/item/:id', {
             templateUrl: '/app/views/item.html',
             controller: 'itemController'
         }).

       otherwise({
           redirectTo: '/home'
       });
    }
]
);

// entities

angular.module("auctionApp").factory("entities", function () {
    var itemEntity = (function () {
        var item = function (id, name, description, price, bids, created) {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Price = price;
            this.Bids = bids || [];
            this.Created = created;
        };
        return item;
    })();

    var bidEntity = (function () {
        var bid = function (id, amount, itemId, created) {
            this.Id = name;
            this.Bid = amount;
            this.ItemId = itemId;
            this.Created = created;
        };
        return bid;
    })();

    return {
        Item: itemEntity,
        Bid: bidEntity
    }
});