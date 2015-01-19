using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using z4a_dsa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace z4a_dsa
{
	public class AuthRepository : IDisposable
	{
		private DefaultContext _ctx;

		private UserManager<IdentityUser> _userManager;

		public AuthRepository()
		{
			_ctx = new DefaultContext();
			_userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
		}

		public async Task<IdentityResult> RegisterUser(UserModel userModel)
		{
			IdentityUser user = new IdentityUser
			{
				UserName = userModel.Username,
				Email = userModel.Email
			};

			var result = await _userManager.CreateAsync(user, userModel.Password);

			return result;
		}

		public async Task<IdentityUser> FindUser(string userName, string password)
		{
			IdentityUser user = await _userManager.FindAsync(userName, password);

			return user;
		}

		public void Dispose()
		{
			_ctx.Dispose();
			_userManager.Dispose();

		}
	}
}