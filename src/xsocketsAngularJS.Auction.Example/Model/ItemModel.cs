using System;
using System.Collections.Generic;

namespace xsocketsAngularJS.Auction.Example.Model
{
    /// <summary>
    /// Implement/Override your custom actionmethods, events etc in this real-time MVC controller
    /// </summary>

    public class ItemModel
    {
        public ItemModel(string name,string description, int price)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Description = description;
            this.Price = price;
            this.Bids = new List<BidModel>();
            this.Created = DateTime.Now;
        }

        public List<BidModel> Bids { get; set; }

        public Guid Id { get; set; }

        public object Created { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }
    }
}