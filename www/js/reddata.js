/*
  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************
*/
(function(exports){ 

	var rawToken = null; 

	function token() {
		if (rawToken) return rawToken;
		return Cookies.get('token');
	}
	exports.token = token;

	exports.gotToken = function() {
		var checkToken = token();
		if (checkToken && (checkToken.length>5)) return true;
		return false;
	}

	exports.setToken = function(newToken) {
		rawToken = newToken;
		Cookies.set('token', newToken, { expires: 7 });
		// show you have the token
		console.log('got token', newToken);
	}

	exports.clearToken = clearToken;
	function clearToken() {
		rawToken = null;
		Cookies.remove('token');
	}

	exports.logout = logout;
	function logout() {
		clearToken();
	}

	/** server calls **/
	function ajaxCall(endpoint, data, success, fail) {
		if (!data) data = {};
		data.token = token();
	  $.ajax({
	    type: 'POST',
	    url: 'https://api.cardcandy.app/'+endpoint,
	    data: data ? JSON.stringify(data) : null,
	    dataType: 'json',
	    async: true,
	    success: success, 
	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	      console.log(endpoint+' error', textStatus, errorThrown);
	      if (fail) fail();
	    },
	    statusCode: {
	      400: function(x) {
	        console.log(endpoint+' 400 error - call unsuccessful');
	        //if (fail) fail(x ? x.responseText : null);
	      },
	      401: function() {
	      	console.log('token expired or invalid');
	      	logout();
	      	console.log('TODO: *** SHOW LOGIN POPUP');
	      	// loginPopup();
	      }
	    }
	  });
	}
	exports.ajaxCall = ajaxCall;

	exports.uploadForm = function(endpoint, formElement, progress, success, fail) {
	  var xhr = new XMLHttpRequest();
	  // put data.token = token(); into formElement?
		xhr.onload = function () {
			success(this.responseText);
		}
    xhr.addEventListener('progress', function(data) { if (progress) progress(data.loaded); }); 
    xhr.addEventListener('error', function() { if (fail) fail(); });
	  xhr.open('POST', 'https://api.cardcandy.app/'+endpoint, true);
	  xhr.send(new FormData(formElement));
	}


})(typeof exports === 'undefined'? this['RedData']={}: exports); 	
