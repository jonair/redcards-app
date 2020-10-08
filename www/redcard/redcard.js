/* 
	RedCard
	Frontend controller 

	UI representation & key behaviour

*/

/* states affect behaviour & visual representation */
const CARD_STATE_VIEWING = 'viewing';
const CARD_STATE_EDITING = 'editing';
const CARD_STATE_READONLY = 'readyonly';
const CARD_STATE_LAYOUT_ONLY = 'layoutonly';
const CARD_STATE_HISTORY = 'history';
const CARD_STATE_FAN = 'fan';
// etc
const EMPTY_IMAGE = '';// noimage.jpg

class RedCard {

  constructor(allData, initialState, initialIndex, onUpdate, onError) {
  	this._content = 'loading...';
  	this._onUpdate = onUpdate;
    this._onError = onError;
  	this._allData = allData;
  	this.state = initialState;
  	this.cardIndex = initialIndex; // forces uiUpdate
  }

  set state(newState) {
  	// transition state
    this._currentState = newState;
    // ui update
    if (this._indx != null) this.uiUpdate();
  }

  get state() {
  	return this._currentState;
  }

  set cardIndex(basedFrom1) {
  	this._indx = basedFrom1-1;
  	if (this._indx >= this._allData.content.length) {
  		// do we:
  		//  extend the array/add new cards?
  		//  report an error?
  		//  change indx back to within range value?
      // console.log('asking for card after end of pack'); // error - cannot find content for index, card Index', basedFrom1, 'setting index',this._indx, 'content length', this._allData.content.length);
      // we're going to allow ui to do a blank card for now...
      this.uiUpdate(true);
      return;
  	} 

    // hidden pages & cover image
    if (this._indx<0) {
      this.uiUpdate();
      return;
    }

    //if ((this.state == CARD_STATE_EDITING) || (this.state == CARD_STATE_FAN) || (!this._allData.content[this._indx].html)) {
      // build
      RedMark.redMarkToHTML(this._allData.content[this._indx].data, (function(htmlContent, imageContent, imageCaption) {
        //console.log(indx, this);
        this._content = htmlContent;
        this._image = imageContent;
        this._caption = imageCaption;
        this.uiUpdate();
      }).bind(this));
    /*
    } else {
      // show...
      this._content = this._allData.content[this._indx].html;
      // extract image & caption...
      this._image = '';
      this._caption = '';
      this.uiUpdate();
    }*/
  }

  get cardIndex() {
  	return this._indx;
  }

  get cardContent() {
		return this._content;
  }

  get layoutType() {
    return this._allData.content[this._indx].layoutType;
  }

  get image() {
    if (this._currentState == CARD_STATE_LAYOUT_ONLY) {
      if (this._image) {
        return EMPTY_IMAGE;
      } else {
        return null;
      }
    } else {
      return this._image;
    }
  }

  get local() {
    if (this._image && ((this._image.substring(0,4)=='http') || (this._image.substring(0,8)=='content/'))) return false;
    return true;
  }

  uiUpdate(hide) {
		// ui update	
		if (this._onUpdate) {
      // check for blank/hidden
      var html;
      //console.log('ui update with', this._indx);

      if ((hide) || (this._indx<-1)) {
        html = redcardHideTemplateView({
          state: this._currentState,
          index: this._indx
        });
      /*
      } else if (this._indx<999) { // not in use at the moment
        html = redcardBlankTemplateView({
          state: this._currentState,
          index:this._indx
        });*/
      } else if (this._indx==-1) {
        html = redcardCoverTemplateView({ 
          local: (this._allData.coverImage && (this._allData.coverImage.substring(0,7)!='covers/')),
          state: this._currentState, 
          image: this._allData.coverImage 
        });
      } else {
        //console.log('getTempalte', this._indx);
        html = this._getTemplate();
      }
      try {
        this._onUpdate(html, this, this._indx);
      } catch (err) {
        if (this._onError) {
          console.log('caught error', this._indx, 'invalid html', html, 'error', err);
          this._onError(err, html, this);
        } else {
          console.log('uncaught error', this._indx, 'invalid html', html, 'error', err);
        }
      }
		}
  }

  get vertAlign() {
    if (this._currentState == CARD_STATE_LAYOUT_ONLY) {
      return 0;
    }
    return this._allData.content[this._indx].vertAlign;
  }

  _getTemplate() {
    return redcardTemplateView({ 
      model: this._allData, 
      card: this._allData.content[this._indx].data,
      vertAlign: this.vertAlign,
      layoutType: this.layoutType, 
      state: this._currentState,
      content: {
        html: this._content, 
        local: this.local, 
        image: this.image,
        caption: this._caption,
        pageno: this._indx+1
      }
    });
  }

}
