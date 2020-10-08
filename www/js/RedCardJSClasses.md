RedCard JS Classes

#redconfig.js - Generates CSS for RedCards based on settings

##Usage

### Get initial values & controls for UI

	var config = new RedConfig(null, id, setBaseCSS, onError);
	values = config.settings;
	// values will contain all available values, along with types & format

### Setting values to generate new CSS

	config = new RedConfig(values, id, function(css) {
		// success
		$(yourdoc).cssId.html(css);
	}, function () {
		// fail
	}

