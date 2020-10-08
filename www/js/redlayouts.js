/* 
	Page breaks within cards 

  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************
*/
// exports 
(function(exports){ 

	const MAX_WORDS_PER_CARD = 80;
	const MAX_CARDS_LAYOUT = 201;
	const MAX_CHARACTERS_PER_CARD = 600; // the block size to read
	const LENGTH_CHECK_FIT_MIN = 60; // characters
	const REDUCE_BY_CHARS = 4; // when a single word is simply too long for a card...
	const MD_HARD_BREAK = '~';
	const IMAGE_MARKER = '![';
	const IMAGE_MARKER_END1 = ')';
	const IMAGE_MARKER_END2 = ']';
	const SMALL_ADJUST_BUFFER = 5;

	var layoutRunningTimeout = 0, layoutRunning = false, repeatCount = 0, multiRunCount = 0;

	/*
	var timer; 
	function logTime(eventStr) {
		now = new Date().getTime();
		if (timer == null) {
			console.log(eventStr, now);
		} else {
			console.log(eventStr, now - timer);
		}
		timer = now;
		
	}*/

	var layoutContent, layoutCancelled = false;
	exports.cancelReworkIfInProgress = cancelReworkIfInProgress;
	function cancelReworkIfInProgress() {
		layoutCancelled = true;
		if (layoutRunning && layoutContent) layoutContent = ''; // remove any content.
	}

	exports.reworkCardBreaks = reworkCardBreaks;
	// startCardIndex, with -1 = cover, cardCount - how many? eg 3 or 999, cards is model from mongo - contains template & raw content etc., 
	function reworkCardBreaks(startCardIndex, cardCount, cards, onComplete, onProgress, onCancel) {

		/* A card break could happen with any of the
		   following criteria:

			 - exceed 600 characters
		   - exceed 80 words
		   - hard break (~)
		   - more than one image
		   or
		   - the words don't fit on the card

		   TODO: (& no orphans)
		*/
		layoutCancelled = false;

		multiRunCount++;
		//logTime('reworkCardBreaks start', multiRunCount);
		if (layoutRunning) {
			// cancel & run again as soon as possible
			// do 
			clearTimeout(layoutRunningTimeout);
			layoutRunningTimeout = 0;
			//console.log('cleared layoutRunning');
			//return;
		}
		//console.log('starting layoutRunning');
		layoutRunning = true;

		// initialise content if not created yet
		if (!cards.content) cards.content = [];
		if (!cards.rawContent) cards.rawContent = '';
		layoutContent = cards.rawContent;

		// find actual start position
		var buildCardIndex = Math.min(cards.content.length, startCardIndex);
		var totalContentLength = layoutContent.length;

		// turn into content position
		var contentPosition = 0;
		for (var i=0;i<buildCardIndex;i++) contentPosition += cards.content[i].data.length; 

		// create div, if not already for building fake hidden cards
		createDummyDiv(cards, function () {
			// GET CONTENT
			readContentForCard();
		});

		function finishReadingCards() {
			tidyDummyDiv();
			layoutRunning = false;
			if (layoutCancelled) {
				console.log('end layoutRunning (cancelled)');
				layoutCancelled = false;
				if (onCancel) onCancel();
				return;
			}
			console.log('end layoutRunning (complete)');
			if (onProgress) onProgress(1, cards, buildCardIndex);
			onComplete(cards); // no content remaining
		}

		function readContentForCard() {
			//logTime('readContentForCard rule 1');
			// RULE: Max 600 characters
			var cardContent = layoutContent.substr(contentPosition, MAX_CHARACTERS_PER_CARD);
			if (cardContent.trim() == '') {
				finishReadingCards();				
				return;
			} 

			if (onProgress) {
				var percent = Math.max(contentPosition / totalContentLength, buildCardIndex / MAX_CARDS_LAYOUT);
				onProgress(percent, cards, buildCardIndex);
			}

			var noLinesEtc = cardContent.replace(/^\s+/, ''); // remove leading line breaks & spaces
			contentPosition += (cardContent.length - noLinesEtc.length);
			cardContent = noLinesEtc;

			// Make H1 (#Heading) tags have page break too...
			var match = /(\n#[.+\w*\d*\s*]).+/.exec(cardContent);
			// if (match.index == 0) console.log('MATCH 0', match);
			if ((match) && (match.index>0)) {
				cardContent = cardContent.substr(0, match.index);
			}

			//logTime('readContentForCard rule 2');
			// RULE: Trim to hard break
			var hb = cardContent.indexOf(MD_HARD_BREAK, 1);
			if (hb>0) cardContent = cardContent.substr(0,hb);

			//logTime('readContentForCard rule 3');
			// RULE: Only 1 image
			var imagePos = cardContent.indexOf(IMAGE_MARKER);
			if (imagePos>=0) {
				// check for second image...
				var image2 = getPositionOf(cardContent, IMAGE_MARKER, 2);
				if (image2>0) cardContent = cardContent.substr(0,image2);
			}

			//logTime('readContentForCard rule 4');
			// RULE: Max 75 words
			// (based on tab, cr & spaces only)
			var words = cardContent.match(/([\n\t ])/g); //TODO: add/remove double spaces?
			var wordsOnCard = words ? words.length : 0;
			while (wordsOnCard > MAX_WORDS_PER_CARD) {
				var cutOff = cardContent.lastIndexOf(words[wordsOnCard-1]);
				cardContent = cardContent.substr(0, cutOff);
				words.pop();
				wordsOnCard--;
			}

			// test to see if content now blank.
			var testContent = cardContent.replace(/^\s+|\s+$/g, '').trim();
			if ((testContent=='') || (testContent=='~')) {
				// console.log('blank card');
				contentFitFinished(cardContent.length == 0 ? 1 : cardContent.length);
				return;
			}

			if (!cards.content[buildCardIndex]) cards.content[buildCardIndex] = {};
			cards.content[buildCardIndex].data = cardContent;

			repeatCount = 0;
			buildThisCard();

			// loop point...
			function buildThisCard() {
				var pageNo = buildCardIndex + 1;

				//logTime('buildThisCard calcLayoutType');
				repeatCount++;
				cards.content[buildCardIndex].layoutType = calcLayoutType(cards.content[buildCardIndex].data);

				/* loop through content fit until contents fits on card (then create actual html and put into content) 
					 this loop repeats some work done in RedCard, but if more than 1 itteration is required, it's ALOT faster
				*/
				if ((buildCardIndex<=0) || (cards.content[buildCardIndex].layoutType == 'image')) {
					contentFitFinished();
					return;
				}
				if ((!cards.content[buildCardIndex]) || (!cards.content[buildCardIndex].data) || (cards.content[buildCardIndex].data.trim()=='')) {
					// console.log('BLANK CARD!'); // TODO: remove card
					contentFitFinished();
					return;
				}

				// a text box exists
				RedMark.redMarkToHTML(cards.content[buildCardIndex].data, function(htmlContent, imageContent, imageCaption) {
					// put "htmlContent" into correct dummy template
					var textbox = $('#dummy-'+cards.content[buildCardIndex].layoutType).find('.cardtext');
					textbox.html(htmlContent).ready(function() {
						//console.log('got textbox for', cards.content[buildCardIndex].layoutType, 'of', textbox);
						var maxHeight = Math.ceil(textbox.innerHeight()) + SMALL_ADJUST_BUFFER; // TODO: remember this height for the 2 types
						var totalHeight = textbox[0] ? textbox[0].scrollHeight - textbox[0].scrollTop : 0;
						if (totalHeight > maxHeight) {							
							// all text following plus one word from the end of this block...
							// reduce so it doesn't, one word at a time		
							// TODO: NEED TO WORK ON REGULAR EXPRESSION... (don't want stray! going!)
							var newData = cards.content[buildCardIndex].data.replace(/([\w^!\[\]/\(\)`"']*[\W.,!?:-]*$)/, '');

							// if no word break, then set back to whole string							
							if ((newData == null) || (newData == '') || (newData.trim() == '')) {
								newData = cards.content[buildCardIndex].data;
								if ((newData == null) || (newData == '')) {
									contentPosition++;
									console.log('data was null', cards.content[buildCardIndex].data);
									buildThisCard();
									return; 
								}
							}

							// see if any actual change (this will now trim whole string)
							if (newData == cards.content[buildCardIndex].data) {
								// reduce by REDUCE_BY_CHARS characters
								newData = newData.substring(0, newData.length - REDUCE_BY_CHARS);
							}

							// save this content
							cards.content[buildCardIndex].data = newData;

							// check whether should finish based on repeat count?
							if (repeatCount > MAX_WORDS_PER_CARD) {
								console.log('stuck in a loop (max repeat count)');
								contentFitFinished();
								return;
							}

							// as long as data remains...
							// goto loop point - do not breathe (no use)
							buildThisCard();
							return; 
						} // effectively, else... 
						// height is ok
						console.log('height needs vert measurement');
						// yes, it fits, take a measurement
						textbox.css({'height':'auto'}).ready(function() {
							console.log('got auto height for', buildCardIndex,'of', $(textbox).height(), Math.max(0, (totalHeight - $(textbox).height()) / 2));
							cards.content[buildCardIndex].vertAlign = Math.max(0, (totalHeight - $(textbox).height()) / 2);
							// carry on with next card...
							contentFitFinished();
						});
					}); // apply textbox html
				}); // red mark to html
			}

			function contentFitFinished(forceMoveBy) {
				if (forceMoveBy > 0) {
					moveOn = forceMoveBy;
				} else {
					var moveOn = cards.content[buildCardIndex].data.length;
					if (moveOn<=0) moveOn++; // alternate force move on...
					buildCardIndex++;
				}
				contentPosition += moveOn;
				repeatCount = 0;

				if (buildCardIndex>=MAX_CARDS_LAYOUT) {
					finishReadingCards();
					return;
				}

				readContentForCard();
			}

		}
	}		

	/*
	exports.extractAndProcessPersonalise = extractAndProcessPersonalise;
	function extractAndProcessPersonalise(css) {
		var personalise = extractPersonalise(css);
		return processPersonalise(css, personalise);
	}

	exports.extractPersonalise = extractPersonalise;
	function extractPersonalise(css) {
		// get object from template css, if one exists
		if (!css) return null;
		if (css.trim()=='') return null;

		var arr = css.match(/\/\*\-((\n|.)*)\-\*\//gm);
		if ((!arr) || (arr.length<=0)) return null;
		var str = arr[0].replace(/\/\*\-/gm, '').replace(/\-\*\//gm, '').trim();
		//console.log('str', str);
		try {
			obj = JSON.parse(str);
		} catch (err) {
			console.log('invalid personalisation', err);
			obj = null;
		}
		return obj; 
	}

	exports.processPersonalise = processPersonalise
	function processPersonalise(css, personalise) {
		if (!personalise) return css;

		var prefix = personalise.prefix ? personalise.prefix : '_';
		personalise.settings.forEach(function (setting) {
			css = css.split(prefix+setting.key).join(setting.value);
		});
		return css;
	}
*/
	function calcLayoutType(cardContent) {
		if (onlyImage(cardContent)) return 'image';
		if (cardContent.indexOf(IMAGE_MARKER)>=0) return 'textimage';
		return 'text';
	}

	function createDummyDiv(cards, success) {
		tidyDummyDiv();
		$('body').append(`<div id="layout-dummy" class="dummy scroll-card"><div id="dummy-textimage"></div><div id="dummy-text"></div></div>`).ready(function() {
			// build temporary cards to create the two layout types for the current style values.
	    var tmpCards = { 
	    	styleValues: cards.styleValues, 
	    	content: [ 
	    		{ layoutType:'text', data:'text' },
	    		{ layoutType:'textimage', data:'textimage' }
	    	]
	    }
			new RedCard(tmpCards, CARD_STATE_LAYOUT_ONLY, 1, function(html1) {
				$('#dummy-text').html(html1).ready(function() { 
					new RedCard(tmpCards, CARD_STATE_LAYOUT_ONLY, 2, function(html2) {
						$('#dummy-textimage').html(html2).ready(success);
					}, function () { });
				})
			}, function () { });
		});
	}

	function tidyDummyDiv() {
		$('.dummy').remove();
	}

	function onlyImage(string) {
		string = string.replace(/([~\n\r\t])/gm,' ').trim();
		var imgMarkerPos = string.indexOf(IMAGE_MARKER);
		var isImage = ((imgMarkerPos<=1) && (imgMarkerPos>=0) && (string.split(IMAGE_MARKER).length==2) &&  
			((string.lastIndexOf(IMAGE_MARKER_END1)==(string.length-1)) || (string.lastIndexOf(IMAGE_MARKER_END2)==(string.length-1))));
		//console.log('onlyImage', isImage, string);
		return isImage;
	}

	function getPositionOf(string, subString, index) {
 		return string.split(subString, index).join(subString).length;
	}

})(typeof exports === 'undefined'? this['RedLayouts']={}: exports); 
