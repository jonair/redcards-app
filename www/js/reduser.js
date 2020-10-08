/* 
	RedCards user functions
	Will use Cookies to store token

  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************

	uses RedDialog
*/

(function(exports){ 

	// designed for red dialog content
	const RED_CREATE_OR_LOGIN_TEMPLATE_HTML = `
		<div class="dialog-message-padded">Login or Create a free account {{#if reason}}to {{reason}}{{/if}}</div>
		<div id="dialog-login-details" class="form-format">
	    <label for="email">Your email</label>
	    <input type="email" class="logindetails" placeholder="your@email.com" id="email" name="email" value="{{email}}" required/> 
	    <div class="dialog-space"></div>
	    <div class="button hollow" id="create-new-account">Create Account</div> <div class="button right" id="login-account">Login</div>
	  </div>
	`;

	var templateRedLoginView = Handlebars.compile(RED_CREATE_OR_LOGIN_TEMPLATE_HTML);

	const RED_CREATE_ACCOUNT_TEMPLATE_HTML = `
		<div class="dialog-message-padded">New account for {{email}}</div>
		<div id="dialog-create-details" class="form-format">
	    <label for="firstname">Firstname</label>
	    <input type="text" placeholder="" id="firstname" name="firstname" value="" required/> 
	    <label for="lastname">Lastname</label>
	    <input type="text" placeholder="" id="lastname" name="lastname" value="" required/> 
	    <label for="organisation">Organisation*</label>
	    <input type="text" placeholder="" id="organisation" name="organisation" value="" required/> 
	    <label for="firstname">Password</label>
	    <input type="password" placeholder="" id="password" name="password" value="" required/> 
	    <label for="password-check">Confirm password</label>
	    <input type="password" placeholder="" id="password-check" name="password-check" value="" required/> 

	    <div class="dialog-space"></div>
	    <div class="button hollow" id="back-to-email">Back</div> <div class="button right" id="create-new-account">Create Account</div>
	  </div>
	`;

	var templateRedCreateAccountView = Handlebars.compile(RED_CREATE_ACCOUNT_TEMPLATE_HTML);

	const RED_LOGIN_ACCOUNT_TEMPLATE_HTML = `
		<div class="dialog-message-padded">Password for {{email}}</div>
		<div id="dialog-login-password" class="form-format">
	    <label for="firstname">Password</label>
	    <input type="password" class="logindetails" placeholder="" id="password" name="password" value="" required/> 
	    <div class="dialog-space" id="forgot-password">Forgot password?</div>
	    <div class="button hollow" id="back-to-email">Back</div> <div class="button right" id="login-to-account">Login</div>
	  </div>
	`;

	var templateRedLoginAccountView = Handlebars.compile(RED_LOGIN_ACCOUNT_TEMPLATE_HTML);

	var userData;

	exports.getUserData = function(optionalProp) {
		if (optionalProp) {
			if (!userData) return '';
			return userData[optionalProp];
		}
		return userData;
	}

	exports.setUsedImages = function(usedImages) {
		userData.usedImages = usedImages;
	}

	exports.loggedIn = loggedIn;
	function loggedIn() {
		if (RedData.gotToken()) return true;
		return false;
	}

	// main entry point here ---

	exports.tokenIntoUserData = tokenIntoUserData;
	function tokenIntoUserData(complete) {
		if (userData || (!RedData.gotToken())) {
			complete();
			return;
		}
		
		RedData.ajaxCall('loginwithtoken', null, function (data) {
			console.log('got loginwithtoken', data);
			userData = data;
			complete(userData);
		});
	}
 
	exports.loginOrCreateUser = loginOrCreateUser;
	function loginOrCreateUser(data, success, fail) {
		RedDialog.forceHide('createaccount');
		RedDialog.forceHide('loginaccount');
		RedDialog.forceHide('loginpass');

		if (RedData.gotToken()) {
			tokenIntoUserData(success);
			return;
		}

		// show dialogs & take through process
		RedDialog.show('login', 'RedCards Account', templateRedLoginView(data), function() {
			$('#create-new-account').click(function() { 
				validEmailAddress($('#email').val(), function (email) {
					createNewAccount(email, success, fail); 
					RedDialog.forceHide('login');
				}, invalidEmail);
			});
			$('#login-account').click(function() { 
				validEmailAddress($('#email').val(), function (email) {
					loginAccount($('#email').val(), success, fail); 
					RedDialog.forceHide('login');
				}, invalidEmail);
			})
		});

	}

	exports.logout = function() {
		userData = null;
		RedData.clearToken();
	}

	function createNewAccount(email, success, fail) {
		// TODO: low priority: chance to capture email now, with link to complete registration?  
		console.log('createNewAccount', email);
		RedDialog.show('createaccount', 'RedCards Account', templateRedCreateAccountView({email:email}), function() {
			$('#back-to-email').click(function() { loginOrCreateUser({email:email}, success, fail); });
			$('#create-new-account').click(function () {
				var user = {
					email: email,
					firstname: $('#firstname').val(),
					lastname: $('#lastname').val(),
					organisation: $('#organisation').val(),
					password: $('#password').val(),
					publisher: true
				}
				//TODO: do local checks first...

				// send to server
				RedData.ajaxCall('createuser', user, function (user) {
			    console.log('created user', user);
			    RedData.setToken(user.token);
			    RedDialog.forceHide('createaccount');
			    userData = user;
			    success(userData);
			  }, function () {
			  	// need to show error dialog?
			  	console.log('failed');
			  });
			});
		});
	}

	function loginAccount(email, success, fail) {
		//console.log('loginAccount', email, fail);
		
		RedDialog.show('loginpass', 'RedCards Account', templateRedLoginAccountView({email:email}), function() {
			$('#back-to-email').click(function() { loginOrCreateUser({email:email}, success, fail); });
			$('#forgot-password').click(function() { sendPassResetLink(email); });
			$('#login-to-account').click(function () {
				// check password length locally....
				var password = $('#password').val();
				// then
				RedData.ajaxCall('login', {email:email, password:password}, function (user) {
					console.log('token is', user);
			    RedData.setToken(user.token);
			    RedDialog.forceHide('loginpass');
					userData = user;			    
			    success(userData);
				}, fail);
			});
		});
	}

	function sendPassResetLink(email) {
		RedData.ajaxCall('resetpassword', {email:email}, function() {
			RedDialog.forceHide('loginpass');
      RedDialog.ok('Password Reset', `A link to reset your password has been sent to ${email}.`);
		});
	}

	function invalidEmail(email) {
		invalidField('#email');
	}

	function invalidField(id) {
		console.log('invalid', id);
		$(id).addClass('missing-info');
		setTimeout(function() { $(id).removeClass('missing-info') }, 3000);
		$(id).focus();
	}

	function validEmailAddress(email, success, fail) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		// used in the model - (value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));


		if ((!email) || (email.trim()=='') || (!regex.test(email))) {
			if (fail) fail(email);
		} else {
			success(email.toLowerCase());
		}
	}

})(typeof exports === 'undefined'? this['RedUser']={}: exports); 
