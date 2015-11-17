using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using XSockets.Owin.Host;

[assembly: OwinStartup(typeof(xsocketsAngularJS.Auction.Example.Startup))]

namespace xsocketsAngularJS.Auction.Example
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            app.UseXSockets();
        }
    }
}
