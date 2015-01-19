using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace z4a_dsa.Controllers
{
    public class InfoController : ApiController
    {
        // GET: api/Info
        public string Get()
        {
			  return DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
        }

        // GET: api/Info/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Info
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Info/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Info/5
        public void Delete(int id)
        {
        }
    }
}
