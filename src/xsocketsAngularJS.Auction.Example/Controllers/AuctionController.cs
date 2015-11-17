using System;
using System.Collections.Generic;
using System.Linq;
using XSockets.Core.XSocket;
using XSockets.Core.XSocket.Helpers;
using XSockets.Core.Common.Socket.Event.Interface;
using System.Threading.Tasks;
using System.Web.Hosting;
using xsocketsAngularJS.Auction.Example.Model;

namespace xsocketsAngularJS.Auction.Example.Controllers
{
    public class AuctionController : XSocketController
    {
        private static object items;

        // just keep a list of auction Items in a static list


        static AuctionController()
        {
           
        }

        /// <summary>
        /// Get a specific AuctionModel ( item )
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task GetItem(Guid id)
        {
            var item = Data.FakeDataAccess.Items.SingleOrDefault(p => p.Id == id);
            await this.Invoke(item, "item");
        }

        /// <summary>
        /// Get the the last 10 auction Items created
        /// </summary>
        /// <returns></returns>
        public async Task GetItems()
        {
            var latest = Data.FakeDataAccess.Items.OrderByDescending(p => p.Created).Take(10);

            await this.Invoke(latest, "Items");
        }

        public async Task AddItem(ItemModel item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.Now;
            Data.FakeDataAccess.Items.Add(item);
            await this.InvokeToAll(item, "itemAdded");


          


        }

        public async Task PlaceBid(BidModel bid)
        {
            bid.Id = Guid.NewGuid();
            var match = Data.FakeDataAccess.Items.SingleOrDefault(p => p.Id == bid.ItemId);
            match.Bids.Add(bid);
            await this.InvokeToAll(bid, "bid");
        }

        public override async Task OnMessage(IMessage message)
        {
            await this.InvokeToAll(message);
        }
    }
}
