angular.module("auctionControllers",['auctionServices']);
// homeController 

angular.module("auctionControllers")
    .controller("homeController", [
        "$scope", "itemsService", function ($scope, itemsService) {
            // get a list of all the items.. Item Service will get the 10 latest..
           
            $scope.items = itemsService.items;
        }
    ]);

// registerController 
angular.module("auctionControllers")
    .controller("registerController", [
        "$scope", "itemsService", "entities", "$location", function ($scope, itemsService, entities, $location) {
            $scope.item = new entities.Item();
            $scope.registerItem = function () {
                itemsService.addItem($scope.item).then(function() {
                    $location.url("/home");
                });
            };
        }
    ]);

// itemController 
angular.module("auctionControllers")
    .controller("itemController", [
        "$scope", "$routeParams", "itemsService", "entities", function ($scope, $routeParams, itemService, entities) {
          

            $scope.placeBid = function() {
                itemService.placeBid($scope.bid);
            };

            itemService.ready.then(function () {
                // get the item

                itemService.getById($routeParams.id).then(function (item) {

                    $scope.bid = new entities.Bid();
                    $scope.item = itemService.item;

                    $scope.bid.ItemId = $scope.item.Id;
                    $scope.bid.Bid =  $scope.item.Price + 1;
                });
            });

        }
    ]);

angular.module("auctionControllers")
    .controller("findController", [
        "$scope", "$routeParams", "findService", function ($scope, $routeParams, findService) {
            $scope.results = findService.results;
                $scope.find = function (event) {
                    if (event.target.value.length > 1) {
                        findService.find(event.target.value);
                    }
                };
        }
    ]);

