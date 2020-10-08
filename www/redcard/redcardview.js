// preload images: https://res.cloudinary.com/redcards/image/upload/c_scale,w_100/v1574816107/shuffle_nuovtw.gif

const REDCARD_TEMPLATE_HTML =
`<div id="card-{{content.pageno}}" class="eachcard card-{{state}}">
	<div class="abs-outter">
	<div class="redcard type-{{layoutType}}"><div class="redcard-clip"><div class="redcard-inner">
		{{#if content.image}}
		<div class="cardimage-holder" style="background-image:url({{#if local}}{{else}}https://res.cloudinary.com/redcards/image/upload/{{/if}}{{content.image}})"></div>
		<div class="cardcaption">{{content.caption}}</div>
		{{/if}}
		<div class="redcard-border"></div>
		{{#if content.html}}
			<div class="cardtext" style="margin-top:{{valign model.styleValues layoutType vertAlign}}px"><span>{{{content.html}}}</span></div>
		{{/if}}
		<div class="pageno">
			{{content.pageno}}
		</div>
		<div class="card-overlay"><div class="overlay"></div><div class="redcards"></div></div>
	</div></div></div>
	</div>
</div>`;

Handlebars.registerHelper('valign', function(styleValues, layoutType, middleMargin) { 
	//console.log('valign', styleValues, layoutType, middleMargin);
	if (!styleValues) return 0;

	var section = styleValues.find(function (values) { return values.section == 'align' });
	if (!section) return 0;

	//texttextvalign
	//textimagetextvalign

	var control = section.controls.find(function (controls) { return controls.key == layoutType+'textvalign'}); // replace with based on layouttype
	if (!control) return 0;

	switch (control.value) {
		case 'middle': return middleMargin;
		case 'bottom': return middleMargin * 2;
	}
	// top
	return 0;
});


var redcardTemplateView = Handlebars.compile(REDCARD_TEMPLATE_HTML);
// usage: redcardTemplateView(data);
//  data.state - 
//  data.model - direct from mongodb??
//  data.card  - the content[i].data for this card
//  data.layoutType - either text, image or textimage
//  data.content - 
//				.html    - view of the data
//				.image   - url to image
//				.pageno  - the page number


const REDCARD_COVER_TEMPLATE_HTML = `
<div id="card--1" class="eachcard card-{{state}}">
	<div class="abs-outter">
	<div class="redcard cover cover-{{state}}" {{#if image}}style="background-image:url({{#if local}}{{else}}https://res.cloudinary.com/redcards/image/upload/{{/if}}{{image}})"{{/if}}>
	</div>
	</div>
</div> 
`;

var redcardCoverTemplateView = Handlebars.compile(REDCARD_COVER_TEMPLATE_HTML);

// for blank cards

const REDCARD_BLANK_TEMPLATE_HTML = `
<div id="card-blank" class="eachcard card-{{state}}">
	<div class="abs-outter">
		<div class="redcard blank">
			<!-- card not in use {{index}} -->
		</div>
	</div>
</div> 
`;

var redcardBlankTemplateView = Handlebars.compile(REDCARD_BLANK_TEMPLATE_HTML);


// for hidden cards (past the end)

const REDCARD_HIDE_TEMPLATE_HTML = `
<div id="card-hidden" class="eachcard card-{{state}}">
	<div class="abs-outter">
		<div class="redcard hidden">
			<!-- card not in use {{index}} -->
		</div>
	</div>
</div> 
`;

var redcardHideTemplateView = Handlebars.compile(REDCARD_HIDE_TEMPLATE_HTML);



const SUMMARY_INFO_BEFORE_READ_HTML = `
<div class="si-subtitle">{{subtitle}}</div>
<div class="si-author">{{author}} 
	{{#each contributors}}<span class="si-contributors">{{.}}</span>{{/each}}
</div>

<div class="si-description">{{description}}</div>
{{#if copyright}}
  <div class="si-copyright"><i class="fas fa-copyright"></i> {{copyright}}</div>
{{/if}}
{{#if url}}
	<div class="si-url"><a href="{{url}}">{{url}}</a></div>
{{/if}}
<div class="si-card-count">{{cardcount}} cards</div>
<div class="si-genre">{{genre}}</div>
{{#with ageTarget}}
<div class="si-age">
	{{#if rangeFrom}}
		{{#if rangeTo}}
			{{rangeFrom}} - {{rangeTo}}
		{{else}}
			{{rangeFrom}}+
		{{/if}}
	{{else}}
		{{#if rangeTo}}
			Up to {{rangeTo}}
		{{else}}
		{{/if}}
	{{/if}}
</div>
{{/with}}

<div class="si-rating"><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></div>
`;

var summaryInfoBeforeReadView = Handlebars.compile(SUMMARY_INFO_BEFORE_READ_HTML); 
