/*
  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************
*/
const CLOUD_BASE = 'https://res.cloudinary.com/redcards/image/upload/';

class RedConfig {

_settings = [
	{ "section": "font",  "controls":[
	  { "name": "Base font", "key":"fontbase", "type":"font", "value":"font-family:'Alegreya'; color:rgba(0,0,0,0.9); font-size: 40px;" },

	  { "name": "Heading 1", "key":"fonth1", "type":"font", "value":"font-family:'Alegreya SC'; font-weight: bold; font-size: 64px; color:rgba(255,0,0,0.9); " },
	  { "name": "Heading 2", "key":"fonth2", "type":"font", "value":"font-size: 54px; color:rgba(255,0,0,0.9);" },
	  { "name": "Heading 3", "key":"fonth3", "type":"font", "value":"font-size: 50px; color:rgba(255,0,0,0.9);" },
	  { "name": "Heading 4", "key":"fonth4", "type":"font", "value":"font-size: 46px; color:rgba(255,0,0,0.9);" },

		{ "name": "Page Number", "key":"pagenofont", "type":"font" },

		{ "name": "Image Caption", "key":"captionfont", "type":"font" },

		{ "name": "Poetry", "key":"fontpoetry", "type":"font" },
		{ "name": "Code", "key":"fontcode", "type":"font" }
	]},

	{ "section": "align", "controls":[

	  { "key":"imagetextpos", "type":"imagetextlayout" }, // "value": [
	  	{ "key":"imageimageonlytop", "value": "0" },
	  	{ "key":"imageimageonlyleft", "value": "0" },
	  	{ "key":"imageimageonlywidth", "value": "600px" },
	  	{ "key":"imageimageonlyheight", "value": "990px" },
	  	{ "key":"imageimageonlyorder", "value": "20" },
	  	{ "key":"imageimageonlyposition", "value": "center" },
	  	{ "key":"imageimageonlysize", "value": "cover" },

	  	{ "key":"imageimagetexttop", "value": "0" },
	  	{ "key":"imageimagetextleft", "value": "0" },
	  	{ "key":"imageimagetextwidth", "value": "600px" },
	  	{ "key":"imageimagetextheight", "value": "600px" },
	  	{ "key":"imageimagetextorder", "value": "20" },
	  	{ "key":"imageimagetextposition", "value": "center" },
	  	{ "key":"imageimagetextsize", "value": "cover" },
	  	/*{ "key":"imageimagetextvalign", "value": "top" }, */

	  	{ "key":"imagecaptionimageonlytop", "value": "890px" },
	  	{ "key":"imagecaptionimageonlyleft", "value": "0" },
	  	{ "key":"imagecaptionimageonlywidth", "value": "600px" },
	  	{ "key":"imagecaptionimageonlyheight", "value": "50px" },
	  	{ "key":"imagecaptionimageonlyalign", "value": "center" },
	  	{ "key":"imagecaptionimageonlyorder", "value": "30" },

	  	{ "key":"imagecaptionimagetexttop", "value": "600px" },
	  	{ "key":"imagecaptionimagetextleft", "value": "0" },
	  	{ "key":"imagecaptionimagetextwidth", "value": "600px" },
	  	{ "key":"imagecaptionimagetextheight", "value": "50px" },
	  	{ "key":"imagecaptionimagetextalign", "value": "center" },
	  	{ "key":"imagecaptionimagetextorder", "value": "30" },

	  	{ "key":"pagenoimageonlytop", "value": "900px" },
	  	{ "key":"pagenoimageonlyleft", "value": "0" },
	  	{ "key":"pagenoimageonlywidth", "value": "600px" },
	  	{ "key":"pagenoimageonlyheight", "value": "50px" },
	  	{ "key":"pagenoimageonlyalign", "value": "center" },
	  	{ "key":"pagenoimageonlyorder", "value": "50" },

	  	{ "key":"pagenotexttop", "value": "900px" },
	  	{ "key":"pagenotextleft", "value": "0" },
	  	{ "key":"pagenotextwidth", "value": "600px" },
	  	{ "key":"pagenotextheight", "value": "50px" },
	  	{ "key":"pagenotextalign", "value": "center" },
	  	{ "key":"pagenotextorder", "value": "50" },

	  	{ "key":"pagenoimagetexttop", "value": "900px" },
	  	{ "key":"pagenoimagetextleft", "value": "0" },
	  	{ "key":"pagenoimagetextwidth", "value": "600px" },
	  	{ "key":"pagenoimagetextheight", "value": "50px" },
	  	{ "key":"pagenoimagetextalign", "value": "center" },
	  	{ "key":"pagenoimagetextorder", "value": "50" },

	  	{ "key":"texttexttop", "value": "100px" },
	  	{ "key":"texttextleft", "value": "100px" },
	  	{ "key":"texttextwidth", "value": "400px" },
	  	{ "key":"texttextheight", "value": "800px" },
	  	{ "key":"texttextalign", "value": "center" },
	  	{ "key":"texttextorder", "value": "40" },
	  	{ "key":"texttextvalign", "value": "top" }, 

	  	{ "key":"textimagetexttop", "value": "650px" },
	  	{ "key":"textimagetextleft", "value": "100px" },
	  	{ "key":"textimagetextwidth", "value": "400px" },
	  	{ "key":"textimagetextheight", "value": "200px" },
	  	{ "key":"textimagetextalign", "value": "center" },
	  	{ "key":"textimagetextorder", "value": "40" },
	  	{ "key":"textimagetextvalign", "value": "top" }

	 // ]}
	  
	/* 
		{ "name": "Text backing", "key": "highlightbackcolor", "type":"color", value:"none" },
		{ "name": "Align", "layout": "short1", "key":"basealign", "type":"list", "value":"center", "list":["left", "center", "right"] },
		{ "name": "Vertical", "layout": "short1", "key":"vertalign", "type":"list", "value":"middle", "list":["top", "middle", "bottom"] },
		//{ "name": "Padding", "layout": "short1", "key": "basepadding", "type":"value" },

		//{ "type":"note", "value":"Card sizing is based from 600 wide, by 990 high. Cards have 3 formats: a mix of text and image." },

		{ "name": "Just Text", "layout": "short2", "key":"---", "type":"list", "value":"center", "list":["left", "center", "right"] },
		{ "name": "Position", "layout": "short2", "key":"---", "type":"possize", "value":"left:40px; top:40px; width:560px; height:800px;" },

		{ "name": "Just Image", "layout": "short3", "key":"---", "type":"list", "value":"center", "list":["left", "center", "right"] },
		{ "name": "Position", "layout": "short3", "key":"---", "type":"possize", "value":"left:40px; top:40px; width:560px;" },
		{ "name": "Image Fit", "layout": "short3", "key":"---", "type":"list", "value":"center", "list":["contain", "cover", "auto", "100%"] },

		{ "name": "Text & Image", "layout": "short4", "key":"---", "type":"list", "value":"center", "list":["left", "center", "right"] },
		{ "name": "Image", "layout": "short4", "key":"---", "type":"possize", "value":"left:40px; top:40px; width:560px; height:560px;" },
		{ "name": "Image Fit", "layout": "short3", "key":"---", "type":"list", "value":"center", "list":["contain", "cover", "auto", "100%"] },
		{ "name": "Text", "layout": "short4", "key":"---", "type":"possize", "value":"left:40px; top:40px; width:560px;" }
*/
	]},
	/*	
	{ "section": "pageno", "controls":[
	]},
	*/

	{ "section": "foreground", "controls":[
		{ "name": "Overlay (Foreground)", "key":"overlaybacking", "type":"background", "value":"background-image:url(template-assets/scrunch-overlay-1_yjcpzf.png); mix-blend-mode:multiply; opacity:0.5;" },

		{ "name": "Image Card overlay", "key": "typeimageoverlay", "type":"background" },
		{ "name": "Text Card overlay", "key": "typetextoverlay", "type":"background"},
		{ "name": "Text & Image Card overlay", "key": "typetextimageoverlay", "type":"background"}
	]},

	{ "section": "background", "controls":[
		{ "name": "Main background", "key": "basebackground", "type":"background", "value":"color:#efefef; background-image:url(template-assets/making-universal-paper-6_boto1v.jpg);" },

		{ "name": "Image Card background", "key": "typeimagebackground", "type":"background" },
		{ "name": "Text Card background", "key": "typetextbackground", "type":"background"},
		{ "name": "Text & Image Card background", "key": "typetextimagebackground", "type":"background"},
		
		{ "name": "Text", "layout":"textbacking", "key": "highlightbackcolor", "type":"color" },	
		{ "name": "Page No", "key":"pagenobackground", "type":"color" },

		{ "name": "Text & Image, Image Caption", "key":"captiontextimagebackground", "type":"color" },
		{ "name": "Image Only, Image Caption", "key":"captiononlyimagebackground", "type":"color" }
	]},

	{ "section": "border", "controls":[
		{ "name": "Inside border", "key": "innerborder", "type":"border", "value":"border-color: rgba(0,0,0,1); border-width: 5px; border-style:none" },	
		/*
		{ "name": "Inside width", "key": "innerwidth", "type":"value", "value":"100%" },
		{ "name": "Inside height", "key": "innerheight", "type":"value", "value":"100%" },
		*/
		{ "name": "Margin", "key": "innermargin", "type":"padding", "value":"40px 60px 80px 60px" },
		{ "name": "Corner radius", "key": "innerradius", "type":"value", "value":"10px" },
		{ "name": "Background", "key":"innerbackground", "type":"background", "value":"center no-repeat cover" }
	]},

	{ "section": "other", "controls":[
		{ "name": "text", "key":"textcss", "type":"code" },
		{ "name": "span", "key":"spancss", "type":"code" },
		{ "name": "page no", "key":"pagenocss", "type":"code" },

		{ "name": ".eachcard", "key":"eachcardcss", "type":"code" },
		{ "name": ".abs-outter", "key":"absouttercss", "type":"code" },
		{ "name": ".redcard", "key":"redcardcss", "type":"code" },
		{ "name": ".redcard-inner (Inside border)", "key":"redcardinnercss", "type":"code" },
		{ "name": ".card-overlay", "key":"cardoverlaycss", "type":"code" },

		{ "name": "img", "key":"allimagecss", "type":"code" },
		{ "name": "image caption", "key":"cardcaptioncss", "type":"code" },

		{ "name": ".type-text", "key":"typetextcss", "type":"code" },
		{ "name": ".type-image", "key":"typeimagecss", "type":"code" },
		{ "name": ".type-textimage", "key":"typetextimagecss", "type":"code" },

		{ "name": "h1", "key":"h1css", "type":"code" },
		{ "name": "h2", "key":"h2css", "type":"code" },
		{ "name": "h3", "key":"h3css", "type":"code" },
		{ "name": "h4", "key":"h4css", "type":"code" },

		{ "name": "ol", "key":"olcss", "type":"code" },
		{ "name": "ol li", "key":"ollicss", "type":"code" },
		{ "name": "ul", "key":"ulcss", "type":"code" },
		{ "name": "ul li", "key":"ullicss", "type":"code" }

	]}
	];

	// css 
css = 
`
_id!.eachcard, _id!.eachcard * {
	-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	-moz-box-sizing: border-box; /* Firefox, other Gecko */
	box-sizing: border-box; /* Opera/IE 8+ */
}

/* everything contained within eachcard */
_id!.eachcard {
	transform-origin: center;
	box-sizing: border-box;
	margin:0;
	border:0;

	_eachcardcss;
}

/* absolute layer */
_id!.abs-outter {
  position: absolute;

	_absouttercss;
}

.redcard.hidden {
  opacity: 0;
}

/* main container for everything redcard */
_id!.redcard {
	_fontbase; /* note: appears again later */

	text-align: center;
  background-color: white;	
  background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	
	_redcardcss; 

	/* fixed */
	display: block;
	width: 600px;
	height: 990px;
  margin: 0;
  padding: 0;

	border-radius: 30px; 
	transform-origin: top left;
	border: none; 	
	resize: none;
	pointer-events: none;

	overflow: hidden;
	word-wrap: break-word; 
	text-overflow: clip;

	-webkit-box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.5);
	-moz-box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.5);
	box-shadow: 0px 0px 60px -10px rgba(0,0,0,0.5);
}

_id!.redcard.type-image {
	_basebackground;
	_typeimagebackground;
}
_id!.redcard.type-text {
	_basebackground;
	_typetextbackground;
}
_id!.redcard.type-textimage {
	_basebackground;
	_typetextimagebackground;
}

_id!.redcard.cover { /* div class, background image is cover */  
	margin:0;
	padding:0;
	border:none;
	background: center no-repeat #eee;
}

_id!.redcard-clip {
  position: absolute;
  top:0;
  left:0;
  width: 600px;
  height: 990px;
  webkit-clip-path: inset(0px round 30px 30px 30px 30px); 
  clip-path: inset(0px round 30px 30px 30px 30px);
}

/* inner content */
_id!.redcard-inner {
	width: 600px;
	height: 990px;
}

_id!.redcard-border {
	width: available;
	width: -moz-available;
	width: -webkit-fill-available;
	height: available;
	height: -moz-available;
	height: -webkit-fill-available;

	margin: _innermargin;
	_innerborder; /* 2px solid rgba(0,0,0,0.5); */
	border-radius: _innerradius; /* 20px; */
	_innerbackground; /* rgba(0,0,0,0.3); */

	_redcardinnercss;	
}

/* overlay over everything */
_id!.card-overlay { 
  position: absolute;
  z-index: 9999;
  top:0;
  left:0;
  width: 600px;
  height: 990px;
  /* mix-blend-mode:  _overlayblend; /* multiply. list: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity; */
}

_id!.card-overlay .overlay {
  position: absolute;
  width: 600px;
  height: 990px;
	_overlaybacking;
	_cardoverlaycss;  
} 

_id!.card-overlay .redcards {
  position: absolute;
  width: 600px;
  height: 990px;
  background-size: cover;
  background-repeat: no-repeat;
	background-image: url(https://res.cloudinary.com/redcards/image/upload/o_40/card-overlay_jxyhke.png);
} 


_id!.redcard.type-text .card-overlay {
	_typetextoverlay;
}
_id!.redcard.type-image .card-overlay { 
	_typeimageoverlay;
}
_id!.redcard.type-textimage .card-overlay { 
	_typetextimageoverlay;
}

/* three layout types */
_id!.redcard.type-text { _typetextcss; }
_id!.redcard.type-image { _typeimagecss; }
_id!.redcard.type-textimage { _typetextimagecss; }

/* images */
_id!.coverimage { /* the cover page */
	/*_coverimagecss;*/
}

/* names follow this convention:
	
	text / image / imagecaption / pageno   +
	imageonly / text / imagetext +
	top / left / width / height / etc...

	These are the sets created:

		imageimageonly
		imageimagetext

		imagecaptionimageonly
		imagecaptionimagetext

		pagenoimageonly
		pagenotext
		pagenoimagetext	  

		texttext
		textimagetext

*/

_id!.cardimage-holder { /* div holder for any image added in the content */
	width:100%;
	height:100%;
	background-repeat: no-repeat;
}

_id!.cardimage-holder:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  z-index: -1;
/*  background-image: set by content */
  background-position: 0 0;
  background-repeat: no-repeat;
  /* set by content 
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
  */
}

_id!.redcard.type-image .cardimage-holder { /* image holder - for image only cards */
	position: absolute;
	z-index: _imageimageonlyorder;
	top: _imageimageonlytop;
	left: _imageimageonlyleft;
	width: _imageimageonlywidth;
	height: _imageimageonlyheight;

	background-position: _imageimageonlyposition;
	background-size: _imageimageonlysize;
}

_id!.redcard.type-textimage .cardimage-holder { /* image holder - for text & image cards */
	position: absolute;
	z-index: _imageimagetextorder;
	top: _imageimagetexttop;
	left: _imageimagetextleft;
	width: _imageimagetextwidth;
	height: _imageimagetextheight;

	background-position: _imageimagetextposition;
	background-size: _imageimagetextsize;
}

_id!.redcard .cardcaption {
	_captionfont;
	_cardcaptioncss;
}

_id!.redcard.type-textimage .cardcaption {
	position: absolute;
	z-index: _imagecaptionimagetextorder;
	top: _imagecaptionimagetexttop;
	left: _imagecaptionimagetextleft;
	width: _imagecaptionimagetextwidth;
	height: _imagecaptionimagetextheight;

	_captiontextimagebackground;
}

_id!.redcard.type-image .cardcaption {
	position: absolute;
	z-index: _imagecaptionimageonlyorder;
	top: _imagecaptionimageonlytop;
	left: _imagecaptionimageonlyleft;
	width: _imagecaptionimageonlywidth;
	height: _imagecaptionimageonlyheight;

	_captiononlyimagebackground;
}

/* headings */
_id!.redcard h1, _id!.redcard h2, _id!.redcard h3, _id!.redcard h4 {
	_fonth1; /* font-family:'Alegreya SC'; font-weight: bold; font-size: 64px; */
}
_id!.redcard h1 {
	_h1css;
}
_id!.redcard h2 {
	_fonth2; /* font-size: 54px; */
	_h2css;
}
_id!.redcard h3 {
	_fonth3; /* font-size: 50px; */
	_h3css;
}
_id!.redcard h4 {
	_fonth4; /* font-size: 46px; */
	_h4css;
}

_id!.redcard ol { _olcss }
_id!.redcard ol li { _ollicss }
_id!.redcard ul { 
	list-style: square outside none;
	_ulcss 
}
_id!.redcard ul li { _ullicss }

_id!.redcard table {
	width: 100%;
	_fonttable; /* inherit, size:34px; */
	_tablecss;
}
_id!.redcard th { 
	border: 1px solid black;
	background: rgba(0,0,0,0.1);
	_fontth; 
	_thcss;
}
_id!.redcard tr { 
	_fonttr;
	_trcss 
}
_id!.redcard td {
	border: 1px solid black;
  _fonttd; 
	_tdcss 
}
/* .redcard .cardtext */
/* text */
_id!.cardtext {
	position: absolute;
	max-height: 850px;
	white-space: normal;
	overflow: hidden;
	_fontbase; /* note: appears on .redcard too */

	_textcss;
}

_id!.type-text .cardtext { 
	z-index: _texttextorder;	
	top: _texttexttop;
	left: _texttextleft;
	width: _texttextwidth;
	height: _texttextheight;
	/*valign: _texttextvalign;*/
}

_id!.type-textimage .cardtext { 
	z-index: _textimagetextorder;
	top: _textimagetexttop;
	left: _textimagetextleft;
	width: _textimagetextwidth;
	height: _textimagetextheight;
	/*valign: _textimagetextvalign;*/
}

_id!.cardtext span {
	background-color: _highlightbackcolor; /* none   - "highligher pen": it's good yellow */
	_spancss;
}

_id!.redcard.cardtext em { font-style: italic; }
_id!.redcard.cardtext strong { font-weight: 600; }
_id!.redcard.cardtext sup {  }

_id!.redcard pre.code { /* technical stuff */
	_fontcode;
	padding: _fontcodepadding;
	_fontcodebackground;
}

_id!.redcard pre.code.poetry { /* poetry (2 tabs) */
	_fontpoetry;
	padding: _fontpoetrypadding;
	_fontpoetrybackground;
}

_id!.pageno {
	position: absolute;
	_pagenofont; /* includes colour etc. */
	padding: _pagenopadding;
	_pagenobackground;
	_pagenocss;
}
_id!.redcard.type-image .pageno {
	z-index: _pagenoimageonlyorder;
	top: _pagenoimageonlytop;
	left: _pagenoimageonlyleft;
	width: _pagenoimageonlywidth;
	height: _pagenoimageonlyheight;
	text-align: _pagenoimagetextalign;
}
_id!.redcard.type-text .pageno {
	z-index: _pagenotextorder;
	top: _pagenotexttop;
	left: _pagenotextleft;
	width: _pagenotextwidth;
	height: _pagenotextheight;
	text-align: _pagenotextalign;
}
_id!.redcard.type-textimage .pageno {
	z-index: _pagenoimagetextorder;
	top: _pagenoimagetexttop;
	left: _pagenoimagetextleft;
	width: _pagenoimagetextwidth;
	height: _pagenoimagetextheight;
	text-align: _pagenoimagetextalign;
}
`;

	constructor(values, id, onCSS, onError) {
		this.onCSS = onCSS;
		this.onError = onError;
		this.id = id;
		this.values = values ? values : this._settings;
		this.addValueKeys();
		this.process(this._values);
	}

	addValueKeys() {
		// makes sure any keys defined in settings are defined in values 
		this._settings.forEach(function (settings_section) {
			settings_section.controls.forEach(function (settings_setting) {
				this._values.forEach(function (values_section, value_index) {
					if (values_section.section == settings_section.section) {
						if (!values_section.controls.find(function(element) { return element.key == settings_setting.key })) {
							//console.log('adding key for', settings_setting.key, 'into', value_index, this._values[value_index]);
							this._values[value_index].controls.push({key:settings_setting.key}); // add new key
						}
					}
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}

	getValue(key, optionalValues) {
		var value;
		var values = optionalValues ? optionalValues : this._values;
		values.forEach(function (section) {
			section.controls.forEach(function (setting) {
				if (setting.key == key) value = setting.value;
			});
		});
		return value;
	}

	setValue(key, value) {
		//console.log('setvalue for', key, 'to', value);
		this._values.forEach(function (section, i_val) {
			section.controls.forEach(function (setting, i_con) {
				if (setting.key == key) {
					//console.log('setting value for', key, 'indexs', i_val, i_con, 'to', value);
					this._values[i_val].controls[i_con].value = value;
					//setting.value = value;
				}
				//if (setting.key == key) this._values[i_val].controls[i_con].value = value;
			}.bind(this));
		}.bind(this));
		this.updated();
	}

	set id(containerId) {
		this._id = containerId;
	}

	set values(val) {
		this._values = val;
		this.updated();
	}

	get values() {
		return this._values;
	}

	get styleValues() {
		var style = [];
		this._values.forEach(function (section) {
			var eachSection = { section:section.section, controls:[] };
			section.controls.forEach(function (setting) {
				if (setting.value!=null) eachSection.controls.push({key:setting.key, value:setting.value});
			});
			style.push(eachSection);
		});
		return style;
	}
	
	updateSettingsSection(part) {
		// update values
		//console.log(part);
		part.controls.forEach(function(control, index) {
			// put values back in to settings...?
			if (control.key) part.controls[index].value = this.getValue(control.key);
		}.bind(this));
		return part;
	}

	getSection(sectionName) {
		var result;
		//console.log('values are', this._values);
		this._settings.forEach(function(part) {
			if (part.section == sectionName) {
				result = this.updateSettingsSection(part);
			}
		}.bind(this));
		return result;
	}
/*
	get settings() {
		return this._settings;
	}
*/
	get css() {
		return this.process(this._values);
	}

	updated() {
		if (this.onCSS) this.onCSS(this.process(this._values));
	}

	process(values) {
		var str = this.css; // makes a copy
		const prefix = '_';

		if (values) {
			values.forEach(function (section) {
				section.controls.forEach(function (setting) {
					if (setting.value != null) {
						// see if image url local/online & set correctly
						var newValue = setting.value;
						if (((typeof newValue) == 'string') && (newValue.indexOf('url(')>=0) && (newValue.indexOf('http')<0)) {
							// correct any url paths for cloudinary
							var startPos = newValue.indexOf('url(');
							var endPos = newValue.indexOf(')', startPos);
							if (endPos>0) {
								startPos += 4; endPos += 1;
								var halfURL = newValue.substring(startPos, endPos);
								newValue = newValue.substr(0,startPos)+CLOUD_BASE+halfURL+newValue.substr(endPos);
								//console.log('********* in hither with '+newValue);
							}
						}
						str = str.split(prefix+setting.key).join(newValue);
					}
				});
			});				
		}

		// remove any unset/unreplaced values
		this._settings.forEach(function (section) {
			section.controls.forEach(function (setting) {
				str = str.split(prefix+setting.key).join('');
			});
		});

		// context
		return str.replace(/_id!/g, this._id ? this._id+' ' : '');	
	}

}
