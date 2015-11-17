using System.Linq;
using XSockets.Core.XSocket;
using XSockets.Core.XSocket.Helpers;
using XSockets.Core.Common.Socket.Event.Interface;
using System.Threading.Tasks;

namespace xsocketsAngularJS.Auction.Example.Controllers
{
    /// <summary>
    /// Implement/Override your custom actionmethods, events etc in this real-time MVC controller
    /// </summary>
    public class SearchController : XSocketController
    {
        public string Query { get; set; }
        public async Task FindItem(string query)
        {
            this.Query = query;
            var results = Data.FakeDataAccess.Items.Where(i => i.Name.ToLower().Contains(query.ToLower()));

            await this.Invoke(results, "findResults");
        }
    }
}
