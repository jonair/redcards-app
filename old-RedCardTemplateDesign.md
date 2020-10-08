# RedCard Templates
Jon Air, 29th August 2019

RedCards is a concise reading platform using visually engaging digital, playing-card sized content that can be consumed on the go without diving into a book.  

Each card should have a purposeful, or at least considered amount of content - with the "page break" coming at a point that aids the content. 

## Roles

The following roles will be referred to here:
- **Designer** - the creator of a template.
- **Publisher** - the author, designer or person publishing a work to appear on RedCards.
- **Reader** - the end user who will consume the content.

## Basic elements

Each card can have 
- One image (optional)
- Text (up to 80 words, or 600 characters per card)

A set of cards will use a template, that typically sets
- The position of the image (if specified) and the text
- Colours, fonts, text style
- Any border or surround
- Background & foreground images, colours, textures etc.

Although, the template is defined as CSS and almost any card attribute can be changed.

*Note there cannot be more than 200 cards or less than 15 cards in any set and blank cards are not permitted*

## Three main layouts

Other than the cover (which is always a single image with no additional effects), there are three main layouts

1. Text Only
2. Image Only
3. Text & Image

## Style elements of a card

Each card is made up of the following html elements (in order)


`#card-[card index]` - The only unique reference (id) to a specific card. "card index" starts from -1 for cover (#card--1), 0 for page 1 and so on.
`.eachcard` - Outer layer for any card.
`.card-[state]` - Class identifying a state of either 'viewing', 'editing', 'readyonly', 'layoutonly', 'history' or 'fan' (although note that further states could be added at any time)

`.abs-outter` - Outter Div block with absolute positioning.

`.redcard` - The actual 600px x 990px card, with 30px border radius.
`.type-[layout type]` - Layout type either 'text', 'image' or 'textimage'.

`.redcard-inner` - The inner div

If Image:
`.cardimage-holder` - Contains the `img` element which has url to image.
`.cardcaption` - Div holding the caption for the image (if specified).

If text:
`.cardtext` - Contains the `span` element which has the html text making up the content. See below for all possible html.

`.pageno` - Div holding the page number.
			
`.card-overlay` - Empty div available as top-most container for effects, overlays and son on.

## HTML content types

On a card, any html that's produced is the result of converting Red MarkDown into html (user entered html will be escaped). 

Currently the following HTML is valid:

`h1,h2,h3,h4` - Headings, defined using #, ## etc.

`ol.li`, `ul.li` - Lists, both numbered & unnumbered, defined using - or 1. etc.

`strong` - Bold/highlight using double asterix
`em` - Italic/highlight using single asterix
`sup` - Superscript using ^hat^

`table th tr td` - Tables using |, + and --- as per Markdown

`pre.code`
`pre.code.poetry`
`code`

## Templates aren't just CSS

The aim of a template is to be used as many times as possible, without becoming obvious or uninteresting to the end reader.  There are a number of ways this can be achieved:

- Plain cards that allow the content to pop
- Designs that blend or alter depending on the content added
- Allow the "publisher" to alter colours, fonts or elements of the design

To allow a "publisher" to alter values, the CSS has a comment with JSON definition of variables.

The comment must start with `/*-` and end with `-*/` and contain valid JSON.

	/*-
	{ "v":"1", "prefix":"_",
	"settings":[
	  { "name":"Background", "key": "background-image", "type":"image", "value":"content/testthis.png" },
	  { "name":"Text highlight", "key": "highlight-color", "type":"color", "value":"rgba(255,200,200,0.3)" },
	  { "name":"Image", "key": "main-image", "type":"image", "value":"content/image.png", "list": ["content/image2.png", "content/image3.png"] }
	]}
	-*/
	
	.redcard {
	  background-image: _background-image;
	}
	
	span {
	  background-color: _highlight-color;
	}


## Setting types

| Type | Details |
|---|---|
| `font` | Will prompt for: `color`, `size`, `font-family`, `letter-spacing`, `weight` |
| `background`| Will prompt for: `size`, `color`, `image`, `position`, `repeat` |
| `border` | Will prompt for: `width`, `style`, `color` |
| `list` | Array of values, shown as drop down |
| `color` | RGB value or RGBA() text, shown as color sample on white |
| `image` | Any image, will be selected, can use `list` to show suggested/built in options |
| `number` | Numeric input, can use `min`, `max`, `allowsuffix` - eg ['%', 'px'] |
| `text` | Free text entry |


? Maybe
`enable` - checkbox, enable/disable a block of css?


## The master template
  


shadow

## Stylesheet examples/tips

### Border using inner

	.redcard {
		background: _border-color;
		margin:0;
		padding:30px;	
	}
	.redcard-inner {
		width:100%;
		height: 100%;
		padding: 40px 60px 80px 60px;
		border: none;
		border-radius: 20px;
		color: _text-color;
		background: _background-color;
		-webkit-box-shadow: inset 0px 0px 40px 0px rgba(0,0,0,0.1);
		-moz-box-shadow: inset 0px 0px 40px 0px rgba(0,0,0,0.1);
		box-shadow: inset 0px 0px 40px 0px rgba(0,0,0,0.1);
	}
	.pageno {
		bottom: 60px;
	}



