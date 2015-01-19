using Microsoft.AspNet.Identity.EntityFramework;
using z4a_dsa.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace z4a_dsa
{
	public class DefaultContext : IdentityDbContext<IdentityUser>
	{
		public DefaultContext()	: base("DefaultContext") {	}
	}
}