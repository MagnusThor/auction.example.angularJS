angular.module("auctionServices", ['xsockets'])
    .config(["xsocketsControllerProvider", function (xsocketsControllerProvider) {
        console.log("auctionServices.config injected");
        //todo: should switch to wss automaticly if https:// scheme is used
        //todo: as well as apply standard ports 80 443 depending on scheme
        xsocketsControllerProvider.open("ws://" + location.host);
    }
    ]);

angular.module("auctionServices").service("findService",
    ["$q", "xsocketsController", function ($q, xsocketsController) {
        var searchController, self = this;
        var isControllerReady = new $q.defer();
        this.results = [];
        this.find = function (query) {
            searchController.invoke("finditem", { query: query });
        };
        this.clearResults = function () {
            this.results.length = 0;
        }
        xsocketsController("search").then(function (controllerInstance) {
            searchController = controllerInstance;
            searchController.on("findresults", function (results) {
                self.results.length = 0;
                results.forEach(function (result) {
                    self.results.push(result);

                });


            });

            isControllerReady.resolve();
        });
        this.ready = isControllerReady.promise;
    }
    ]
);

angular.module("auctionServices").service("itemsService", ["$q", "xsocketsController",

function ($q, xsocketsController) {

    var self = this, auctionController, isControllerReady = new $q.defer(), getByIdPromise;

    this.items = [];
    this.item = {};

    this.addItem = function (item) {
        var d = new $q.defer();
        auctionController.invoke("addItem", item);
        d.resolve(item);
        return d.promise;
    };
    this.getById = function (id) {
        getByIdPromise = new $q.defer();
        auctionController.invoke("getitem", { id: id });
        return getByIdPromise.promise;
    };
    this.placeBid = function (bid) {
        auctionController.invoke("placebid", { Bid: bid.Bid, itemId: bid.ItemId });
    };
    xsocketsController("auction").then(function (ctrlInstance) {
        auctionController = ctrlInstance;
        auctionController.on("item", function (item) {
            self.item = item;
            getByIdPromise.resolve(item);
        });
        auctionController.on("itemadded", function (item) {
            self.items.push(item);
        });
        auctionController.on("items", function (items) {

            items.forEach(function (item) {

                self.items.push(item);
            });
        });
        auctionController.on("bid", function (bid) {
            var match = self.items.findIndex(function (pre) {
                return pre.Id === bid.ItemId;
            });
            self.items[match].Bids.push(bid);

            // fuzzy, but quick..
            if (self.item.hasOwnProperty("Id")) {
                self.item.Bids.push(bid);
            }
        });

        auctionController.invoke("getitems", {});
        isControllerReady.resolve();

    }).catch(function (err) {
        isControllerReady.reject(err);
    });

    this.ready = isControllerReady.promise;

}
]);


