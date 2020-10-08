# RedCards Documentation

## Introduction

The "frontend" code (html/css/js) consists of
- **App** code (phonegap)
- **Website** code 
- **Common code** shared between the two

This source is then distributed as **"Mini-fied"** publishable code ready for

- **PhoneGap** build (to iOS & Android APK)
- A **Node** server as the "Frontend" code to be distributed here

Code relies on the following open source libraries

- Handlebars - templating, use both on web server and frontend
- (todo)
- See API package.JSON for all backend node dependancies

### Services

- **GitHub** - Source control, (names of repositories)
- **Heroku** - Node server (names of projects)
- **MongoDB** - Datastore (test & live databases)
- **Cloudinary** - Image store, delivery & manipulation
- **SendGrid** - Emails from the web & within the app

## Environment

Setting up the development environment

### Directories

### Git repositories

### Source & Builds

Although the source can be built in PhoneGap and is valid web code, a batch file runs the code through a process which performs three main functions
- Combining multiple css & js files
- 'Minify' the code - removing comments, whitespace & making it harder to rip & more efficient
- Sending the libraries to multiple locations to be used both in the PhoneGap app & web & for distributables

![](docs/build-diagram-1.png)

### Running a build

Ensure the directory structure is correct
Run b.bat (TODO: MORE)

## Supported Environments
Browsers & operating systems expecting to work

## Fonts

# Carousel Guide
## Purpose
Share your own cards as a carousel on a web page.
## Usage
Basic usage

	<script type="text/javascript" src="https://redcards.com/embed/redcarousel.js"></script>
	<div id="read-about-red-cards">
	  <redcards width="600" height="380" key="5d3594c1feb3900017792a21" startpage="-1" autoscroll="1" speed="5" />
	</div>`

## Options

`key` - Unique ID for the cards
`width, height` - The assigned area for the cards to use
`startpage` - -1 means cover, 0 = page 1 and so on.
`autoscroll` - Whether the carousel will rotate through the cards or wait for clicks
`speed` - Number of seconds to spend on each card when using autoscroll

## Requirements
You need to use JQuery(!? - can we include automaticallly?)

# References & Notes

## b.bat

	REM n can do...
	Put all js into one file, same with css
	minify those files
	adjust the header to look at new js & css
	copy to directories
	
	confirm build?
	git push/etc

## Useful links

- PhoneGap key signing
http://docs.phonegap.com/phonegap-build/signing/ios/
https://build.phonegap.com/apps/3597565/builds

- Local file storage
https://stackoverflow.com/questions/14928202/save-image-in-local-storage-phonegap
Use FileSystem - https://www.html5rocks.com/en/tutorials/file/filesystem/

- Icon generation
https://pgicons.abiro.com/

- Fancy border raduis - shapes (not clippy, but border radius)
https://9elements.github.io/fancy-border-radius/#46.55.29.26--198.120

- Clippy
Circle:
clip-path: circle(50% at 50% 50%);
Down arrow thing:
clip-path: polygon(0 80%, 25% 80%, 48% 100%, 70% 80%, 100% 80%, 100% 0, 0 0);

- Use deep links to go to a book or content in app if on mobile - depending on platform
Android: https://developer.android.com/training/app-links
iOS: https://medium.com/wolox-driving-innovation/ios-deep-linking-url-scheme-vs-universal-links-50abd3802f97


## Import tools, source & routines
- Converting PPTX to Markdown
https://github.com/datalorax/slidex
https://github.com/ssine/pptx2md

- this converts from almost any format into almost any - EPUB files to Markdown for example!?
https://pandoc.org 

- this is great for just text
https://github.com/dbashford/textract


# Future thoughts

## Alternate icons
https://streamlineicons.com/

## Create CSS with circles & shapes for images
https://bennettfeely.com/clippy/


# Making Templates
This is it's own document! Technical guide to making templates

## Example of svg embeded in css

	url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><linearGradient id='gradient'><stop offset='10%' stop-color='%23F00'/><stop offset='90%' stop-color='%23fcc'/> </linearGradient><rect fill='url(%23gradient)' x='0' y='0' width='100%' height='100%'/></svg>");



## Rotation

	![](content/ihstxozy43jsxiiixsmd,r=90)

	one option is to
	#myelement:before
	{
	    content: "";
	    position: absolute;
	    width: 200%;
	    height: 200%;
	    top: -50%;
	    left: -50%;
	    z-index: -1;
	    background: url(background.png) 0 0 repeat;
	    -webkit-transform: rotate(30deg);
	    -moz-transform: rotate(30deg);
	    -ms-transform: rotate(30deg);
	    -o-transform: rotate(30deg);
	    transform: rotate(30deg);
	}