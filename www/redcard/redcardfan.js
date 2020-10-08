class RedCardFan {

  constructor(allData, fanSize, pageNo, onUpdate) {
  	var midFan = Math.round((fanSize-1)/2);
    var initialIndex = pageNo+1;
  	this._redCards = [];

  	for (var i=0; i<fanSize; i++) {
  		var cardIndex = (initialIndex - midFan) + i;
  		//if (cardIndex<0) {
  			// need to report back that it needs to be hidden?
  		//	console.log('cardIndex below zero', cardIndex, i, initialIndex, midFan);
  		//} else {
		  	this._redCards.push(new RedCard(allData, CARD_STATE_FAN+'-'+(i+1), cardIndex, onUpdate));
		  //}
  	}
	}

	get redCards() {
		return _redCards;
	}

}