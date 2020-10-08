/*
  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************
*/

// exports means code can be shared between JS frontend & Node
(function(exports){ 


	const RED_DIALOG_TEMPLATE_HTML = `
		<div class="dialog-backing" id="dialog-{{id}}">
			<div class="dialog-container" id="{{id}}">
				<div class="dialog-title">{{title}}</div>
				<div class="dialog-close"><i class="fal fa-times"></i></div>
				<div class="dialog-content">{{{content}}}</div>
			</div>
		</div>
	`;
	var redDialogTemplateView = Handlebars.compile(RED_DIALOG_TEMPLATE_HTML);

	const RED_OK_CONTENT_TEMPLATE_HTML = `
		<div class="dialog-pad">
			<div>{{{message}}}</div>
			<div class="dialog-space"></div>
			<div class="button" id="ok-button">{{#if button}}{{button}}{{else}}OK{{/if}}</div>
		</div>
	`;
	var redOKContentTemplateView = Handlebars.compile(RED_OK_CONTENT_TEMPLATE_HTML);

	exports.show = show;
	function show(id, title, content, onready) {
		$('body').append(redDialogTemplateView({id:id, title:title, content:content})).ready(function () {
			$('.dialog-close').click(closeDialog);
			$('.dialog-backing').on('mousedown', closeDialog); //click isnt as good here
			if (onready) onready();
		});
	}

	exports.ok = function(title, message, optionalButtonText, optionalAction) {
		show('ok', title, redOKContentTemplateView({message: message, button: optionalButtonText}), function() {
			$('#ok-button').click(function() { 
				if (optionalAction) optionalAction();
				closeDialog();
			});
		});
	}

	function closeDialog(e) {
		if (e.currentTarget && (e.currentTarget!=e.target)) return;

		if ($(this).hasClass('dialog-backing')) {
			$(this).remove();
		} else {
			$(this).closest('.dialog-backing').remove();
		}
	}

	exports.forceHide = function(id) {
		$('#dialog-'+id).remove();
	}


})(typeof exports === 'undefined'? this['RedDialog']={}: exports); 
