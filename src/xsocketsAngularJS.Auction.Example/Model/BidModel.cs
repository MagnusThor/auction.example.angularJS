using System;

namespace xsocketsAngularJS.Auction.Example.Model
{
    public class BidModel
    {
        public BidModel(int bid, Guid itemId )
        {
            this.Id = Guid.NewGuid();
            this.Bid = bid;
            this.ItemId = itemId;
            this.Created = DateTime.Now;
        }

        public DateTime Created { get; set; }

        public Guid ItemId { get; set; }

        public int Bid { get; set; }

        public Guid Id { get; set; }
    }
}