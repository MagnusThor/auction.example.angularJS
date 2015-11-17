using System.Collections.Generic;
using xsocketsAngularJS.Auction.Example.Model;

namespace xsocketsAngularJS.Auction.Example.Data
{
    public static class FakeDataAccess
    {
        public static List<ItemModel> Items;

        static FakeDataAccess()
        {
            Items = new List<ItemModel> {new ItemModel("Golden chair", "A nice golden char..", 1)};
          
        }
    }
}