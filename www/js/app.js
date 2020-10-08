/*
  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************

  Base app events & notifications
*/
var app = {
  // Application Constructor
  initialize: function(whenReady) {
    this.bindEvents(whenReady);
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function(whenReady) {
    document.addEventListener('deviceready', function() {
        app.setupPush();
        whenReady();
      }, false);
  },
  setupPush: function() {
    console.log('calling push init');
    try {
      var push = PushNotification.init({
        "android": {
          "senderID": "XXXXXXXX"
        },
        "browser": {},
        "ios": {
          "sound": true,
          "vibration": true,
          "badge": true
        },
        "windows": {}
      });
    } catch (err) {
      console.log('Cannot setup push', err);
    }
    console.log('after init');
    if (!push) return;

    push.on('registration', function(data) {
      console.log('registration event: ' + data.registrationId);

      var oldRegId = localStorage.getItem('registrationId');
      if (oldRegId !== data.registrationId) {
        // Save new registration ID
        localStorage.setItem('registrationId', data.registrationId);
        // Post registrationId to your app server as the value has changed
      }

      /*
      var parentElement = document.getElementById('registration');
      var listeningElement = parentElement.querySelector('.waiting');
      var receivedElement = parentElement.querySelector('.received');
      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');
        */
    });

    push.on('error', function(e) {
      console.log("push error = " + e.message);
    });

    push.on('notification', function(data) {
      console.log('notification event');
      navigator.notification.alert(
        data.message,         // message
        null,                 // callback
        data.title,           // title
        'Ok'                  // buttonName
      );
   });
  }
};

const DRAG_ELM = '#card-holder .abs-outter';
var allCards, cardIndex, baseScale;

function initStarted() {
  // sizing
  baseScale = (window.innerWidth-80) / 600; // 80 = 40 padding each side minimum
  var heightScale = (window.innerHeight-200) / 990;
  // pick whichever will fit screen best...
  if (heightScale<baseScale) baseScale = heightScale;
  if (baseScale>1) baseScale = 1; // never scale up

  $('#back-button').click(closeCards);
  $('#browse-search').mousedown(toggleBrowseSearch);
  $('.open .semi, #browse-search-info').click(hideBrowseSearch);
}

// typed messages....
/* main 2 calls */
function doMessage(line, message, deleteAfter, onComplete) {
  var selector = '#line-'+line;
  typeMessage(selector, message, false, function() {
    if (deleteAfter) {
      deleteMessage(line, onComplete);
      return;
    }
    onComplete();
  });
}

function deleteMessage(line, onComplete) {
  var selector = '#line-'+line;
  typeMessage(selector, $(selector).text(), true, onComplete);
}

/* other functions */
function typeMessage(selector, message, del, onComplete) {
  const speed = del ? 150 : 225;
  const lineendspeed = speed * 2;

  $(selector).addClass('play-message');

  var typingInterval = 0, typingCount = del ? message.length : 0;
  typingInterval = setInterval(function() {
    // type each character
    if (del) {
      typingCount--;
    } else {
      typingCount++;
    }

    $(selector).text(message.substr(0, typingCount));

    // done
    if ((typingCount<=0) || (typingCount>=message.length)) {
      clearInterval(typingInterval);
      setTimeout(function() { // pause at end of line
        $(selector).removeClass('play-message');
        if (onComplete) onComplete();
      }, lineendspeed);
    }
  }, speed);
}

function showSection(sectionName) {
  $('.section').removeClass('hidden');
  $('.section').addClass('hidden');
  $('#'+sectionName).removeClass('hidden');
}

// startup/login
function showStartup() {
  showSection('startup');
  typeMessages();
  // blah
  $('#startup').click(browseCards);  // for now - will be when login...  

  /*
  console.log('get the promo covers');
  RedData.ajaxCall('getpromocovers', {token:'soon'}, function(promos) {
  
  }, function() {
    console.log('get covers failed');
  });
  */    
}

function browseCards() {
  showSection('browse');
  // get the lists...
  RedData.ajaxCall('browsecards', {}, function(lists) {
    $('#library').html(browseListsTemplateView(lists)).ready(function() {
      // last read - could add - $('').addClass('zoom-tilt');
      $('.browse-cover').click(function() { 

        var open = $(this).hasClass('open');
        $('.browse-cover').removeClass('open');

        if (!open) {
          $(this).addClass('open');
        } else {
          selectTitle($(this).data('id')); // TODO: pass existing data on cards as well?
        }

      }); 
    });
  });
}

function toggleBrowseSearch() {
  if ($('#browse-footer').hasClass('open')) {
    hideBrowseSearch();
  } else {
    showBrowseSearch();
  }
}

function showBrowseSearch() {
  $('#browse-footer, #browse-search-info').addClass('open');
  $('#account, #settings').addClass('hidden');
  setTimeout(function() { $('#search-text').focus(); }, 250);
}

function hideBrowseSearch() {
  $('#account, #settings').removeClass('hidden');
  $('#browse-footer, #browse-search-info').removeClass('open');  
}

function selectTitle(id, cards) {
  hideBrowseSearch();
  // transition...

  if (cards) {
    gotCards(cards);
  } else {
    RedData.ajaxCall('getcards', {id:id}, gotCards);
  }

  function gotCards(cards) {
    // setup
    allCards = cards;
    // set the title
    $('#read-title').removeClass('nowrap-scroll');
    $('#read-title').text(cards.title).ready(function() {
      if ($('#read-title').width() > (window.innerWidth-60)) $('#read-title').addClass('nowrap-scroll');
    });

    // style the cards
    $('#template-css').html(cards.style);
    // add the summary before reading
    $('#before-reading').html(summaryInfoBeforeReadView(cards));
    
    // read
    cardIndex = -1;
    showNextCard();
    showSection('read');
    showBeforeReading();
  }  
}

// browsing & lists
const BROWSE_LISTS_HTML =
`{{#each .}}
  <div class="section-title">{{title}}</div>
  <div class="list-section">
    {{#each details}}
      <div class="browse-cover" data-id="{{_id}}" style="background-image:url(https://res.cloudinary.com/redcards/image/upload/c_fit,r_6,w_156,h_258/{{coverImage}}.jpg)">
        <div class="browse-title">{{title}}</div>
      </div>
    {{/each}}
  </div>
{{/each}}`; // TODO: local image for cover if no internet

var browseListsTemplateView = Handlebars.compile(BROWSE_LISTS_HTML);


//////////////// reading
function closeCards() {
  showSection('browse');
}

function showBeforeReading() {
  $('#before-reading').removeClass('gone');
  if (!$('#before-reading').hasClass('show-before')) {
    setTimeout(function() { $('#before-reading').addClass('show-before'); }, 150);
  }
  $('#before-reading').off('click');
  $('#before-reading').click(function () { 
    $('#before-reading').toggleClass('show-before');
  });
}

function hideBeforeReading() {
  $('#before-reading').removeClass('gone');
  $('#before-reading').removeClass('show-before');
}

function beforeReadingGone() {
  hideBeforeReading();
  $('#before-reading').addClass('gone');
}

function showNextCard() {
  var totalCards = allCards.content.length;

  cardIndex++;
  if (cardIndex>totalCards) cardIndex=0; // might want to show end, read next or about the author etc...?

  var percent = cardIndex / totalCards;
  $('#read-progress').css({'width': parseInt(percent*100)+'%'});

  // show main card
  getCard(cardIndex, updateCard);

  // card underneath (the next card)
  $('#next-card-holder').empty();
  getCard(cardIndex+1, backingCard);
  showPreviousCards(cardIndex);

  if (cardIndex==0) {
    $('#header-bar').removeClass('closed');  
    hideBeforeReading();
  } else if (!$('#header-bar').hasClass('closed')) {
    $('#header-bar').addClass('closed');
    beforeReadingGone();
  }
}

function showPreviousCards(indx) {
  $('#previous-cards').empty();
  var prev = Math.max(indx-3, 0);
  for (var i=prev;i<Math.min(indx, prev+3);i++) {
    $('#previous-cards').append(`<div class="prev-card" id="prev-${i-1}" data-pageno="${i}"></div>`);
    getCard(i, updatePreviousCard);
  }

  if (indx<=1) {
    setTimeout(function () { $('.prev-card').addClass('show') }, 500);
  } else {
    $('.prev-card').addClass('show');
  }

  $('.prev-card').off('click');
  $('.prev-card').on('click', gotoThisPrevCard);
}

function gotoThisPrevCard() {
  var pageno = $(this).data('pageno');
  cardIndex = pageno - 1;
  showNextCard();
}

function getCard(indx, onUpdate) {
  if (indx>allCards.content.length) return null;
  if (indx==0) {
    // build cover...
    new RedCard(allCards, CARD_STATE_VIEWING, 0, onUpdate);
  } else {
    // already built, show card...
    onUpdate(allCards.content[indx-1].html, null, indx);
  }
}

function setBigCardSize(holder) {
  $(holder+' .redcard').css({'transform':`scale(${baseScale}, ${baseScale})`}); // set the card size
  $(holder+' .eachcard').css({'width':`${baseScale*600}px`}); // this ensures center alignment will work
  // now align the other way
  var top = (window.innerHeight - (baseScale*990)) / 2;
  if (top<60) top = 60;
  $(holder).css({top:`${top}px`});
}

function updateCard(html, redcard) {
  $('#card-holder').html(html);
  setBigCardSize('#card-holder');
  
  if (redcard && (redcard.cardIndex==-1)) {
    $(DRAG_ELM).addClass('hint-turn');
  }
  $(DRAG_ELM).on('touchstart', startCardDrag); // mousedown
  $(DRAG_ELM).on('touchend', endCardDrag); // mouseup
 // $(DRAG_ELM).on('mouseout', outCardDrag);
  $(DRAG_ELM).on('touchmove', moveCardDrag); // mousemove
}

function backingCard(html, redcard) {
  $('#next-card-holder').html(html);
  setBigCardSize('#next-card-holder');
}

function updatePreviousCard(html, rc, indx) {
  if (indx<0) indx=0;
  $(`#prev-${indx-1}`).html(html);
}

/* --- make this a class if its the right method... ---*/
var startDragNoAction = 0;
function startCardDrag(e) {
  $(DRAG_ELM).removeClass('hint-turn'); // otherwise animation overrides the transition here
  $('#footer-bar').removeClass('hide-footer');
  startDragNoAction = setTimeout(function() { trans(DRAG_ELM, -5, 0.9); }, 200);
  if (e.touches) {
    transPosStart(e.touches[0].pageX, e.touches[0].pageY);
  } else {
    transPosStart(e.pageX, e.pageY);
  }
}
function moveCardDrag(e) {
  clearTimeout(startDragNoAction);
  $(DRAG_ELM).removeClass('card-trans');
  $(DRAG_ELM).addClass('card-dragging');
  if (e.touches) {
    transPos(e.touches[0].pageX, e.touches[0].pageY);
  } else {
    transPos(e.pageX, e.pageY);
  }
}
function outCardDrag(e) {
  if (e.currentTarget == e.target) endCardDrag(e);
}
function endCardDrag(e) {
  clearTimeout(startDragNoAction);
  $('#footer-bar').addClass('hide-footer');

  var dragAmount = parseInt($(DRAG_ELM).css('margin-left').replace('px', ''));
  //console.log(dragAmount);
  if (dragAmount>40) {
    $(DRAG_ELM).addClass('card-trans');
    $(DRAG_ELM).css('margin-left', window.innerWidth+'px');
    $(DRAG_ELM).css('margin-top', '0');
    $(DRAG_ELM).css('opacity', '0.7');
    setTimeout(showNextCard, 250);
    return;
  }

  $(DRAG_ELM).removeClass('card-dragging');
  $(DRAG_ELM).addClass('card-trans');
  transPosStart(0,0);

  trans(DRAG_ELM, 0, 1);
  $(DRAG_ELM).css('transform','0');
  $(DRAG_ELM).css('margin-left','0');
  $(DRAG_ELM).css('margin-top', '0');
  $(DRAG_ELM).css('opacity', '1');
}

var posOffset, WIDTH, HEIGHT;
function transPosStart(x,y) {
  posOffset = {x:x, y:y};
  WIDTH = $(window).width();
  HEIGHT = WIDTH * 1.65;
}
function transPos(x,y) {
  if ((x==null) || (y==null)) return;
  if (!posOffset) return;

  var posX = x-posOffset.x;
  var posY = y-posOffset.y;
  if (posY<10) posY = 10;
  var percentX = posX / WIDTH;
  var percentY = 1 - (posY / HEIGHT);
  if (percentY>1) percentY = 1;
  $(DRAG_ELM).css('margin-left', posX+'px');
  $(DRAG_ELM).css('margin-top', posY+'px');
  trans(DRAG_ELM, -20 * percentX, percentY);

  return (posX>50);
  //console.log(percent);
}

var lastTrans = {};
function trans(el, rot, scale) {
  if (rot==null) rot = lastTrans[el].rot;
  if (scale==null) scale = lastTrans[el].scale;
  $(el).css({'transform':`rotate(${rot}deg) scale(${scale},${scale})`});
  lastTrans[el] = {rot:rot, scale:scale};
}