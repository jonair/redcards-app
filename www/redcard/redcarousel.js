// get jquery?
$(document).ready(function() {
	if ($('redcards').length<1) return; // no tag
	// save attributes
	var width = $('redcards').attr('width').replace('px', '');
	var height = $('redcards').attr('height').replace('px', '');
	var scale = height / 990;
	var scroll = $('redcards').attr('autoscroll') == '1';
	var startpage = $('redcards').attr('startpage');
	var id = $('redcards').attr('key');
	var speed = $('redcards').attr('speed');
	if (!speed) speed = 5;
	var nextCardInterval = 0;

	// get the cards
	RedData.ajaxCall('getcards', {id:id}, function(cards) { 
		$('redcards').replaceWith(`<style>
			  .card-held { position:absolute; opacity:0; transform-origin: center; width:${Math.round(600*scale)}px; height:${Math.round(990*scale)}px; transition: transform 0.5s ease, opacity 0.5s; cursor:pointer; }
			  .card-held.pos-3 { transform: scale(0.6,0.6) translateX(400px);  opacity: 0; }
			  .card-held.pos-2 { transform: scale(0.6,0.6) translateX(-400px);  opacity: 0; }
			  .card-held.pos-1 { transform: scale(0.6,0.6) translateX(-400px);  opacity: 1; }
			  .card-held.pos0  { transform: scale(1.0,1.0) translateX(0);      opacity: 1; }
			  .card-held.pos1  { transform: scale(0.6,0.6) translateX(400px); opacity: 1; }
			  .card-held.pos2  { transform: scale(0.6,0.6) translateX(400px); opacity: 0; }
			  .card-held.pos3  { transform: scale(0.6,0.6) translateX(-400px); opacity: 0; }
			  .redcard { webkit-box-shadow: none;  -moz-box-shadow: none; box-shadow: none; }
				.eachcard { transform-origin:top left; transform:scale(${scale}, ${scale}); }  
				${cards.style}</style>
				<div id="${id}" style="width:${width}px; height:${height}px; margin:auto; text-align:center; position:relative;"></div>`);
		buildCards(function() {
			showCard(startpage ? startpage : 0);
			if (scroll) nextCardInterval = setInterval(function() {
				cardIndex++;
				if (cardIndex>=cards.content.length) cardIndex = -1;
				showCard(cardIndex);
			}, speed * 1000);
		});

		function clickCard() {
			showCard($(this).data('index'));
			//? clearInterval(nextCardInterval);
		}

		function showCard(indx) {
			cardIndex = parseInt(indx);
			$('.card-held').removeClass('pos-3 pos-2 pos-1 pos0 pos1 pos2 pos3');
			for (var i=-3;i<=3;i++) {
				$(`.card-held#redcardshow-${cardIndex+i}`).addClass('pos'+i);
			}
		}

		function buildCards(success) {
	    new RedCard(cards, CARD_STATE_VIEWING, 0, function (html) { createCard(id, -1, html); });
			cards.content.forEach(function (eachcard, indx) { createCard(id, indx, eachcard.html); });
			// wait for ready?
			$('.card-held').css('left', Math.round((width/2) - ((600*scale)/2))+'px'); 
			$('.card-held').click(clickCard); 
			success();
		}

		function createCard(id, indx, html) {
	    $(`div #${id}`).prepend(`<div class="card-held" id="redcardshow-${indx}" data-index="${indx}">${html}</div>`);
		}

	});

});
