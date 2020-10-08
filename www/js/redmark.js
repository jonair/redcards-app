/* Markdown: RedCards style 

  *********************************************************
  DO NOT CHANGE SOURCE IN "SOURCE" OR "COMPILE" FOLDERS
  SOURCE MUST BE CHANGED IN MOBILE /APP/WWW/JS FOLDER ONLY
  *********************************************************
*/

// exports means code can be shared between JS frontend & Node
(function(exports){ 

	exports.redMarkToHTML = redMarkToHTML;
	function redMarkToHTML(redMark, complete) {

		// 1. make any html in the text safe
		redMark = escapeHtml(redMark);

		// 2. find & replace all markdown bits
		redMark = parse(redMark, null, complete);
	}

	//////////////////////////////////////////////////////////////////////

	function escapeHtml(str) {
		var HTML_ESCAPE_TEST_RE = /[&<>"]/;
		var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
		var HTML_REPLACEMENTS = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;'
		};

		function replaceUnsafeChar(ch) {
		  return HTML_REPLACEMENTS[ch];
		}

	  if (HTML_ESCAPE_TEST_RE.test(str)) {
	    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	  }
	  return str;
	}

	function isSpace(code) {
	  switch (code) {
	    case 0x09:
	    case 0x20:
	      return true;
	  }
	  return false;
	}

	// Zs (unicode class) || [\t\f\v\r\n]
	function isWhiteSpace(code) {
	  if (code >= 0x2000 && code <= 0x200A) { return true; }
	  switch (code) {
	    case 0x09: // \t
	    case 0x0A: // \n
	    case 0x0B: // \v
	    case 0x0C: // \f
	    case 0x0D: // \r
	    case 0x20:
	    case 0xA0:
	    case 0x1680:
	    case 0x202F:
	    case 0x205F:
	    case 0x3000:
	      return true;
	  }
	  return false;
	}

	//////////////////////////////////////////////////////////////////////

	const TAGS = {
		'' : ['<em>','</em>'],
		_ : ['<strong>','</strong>'],
		'~' : ['<s>','</s>'],
		//'\n' : ['<br />'],
		' ' : ['<br />'],
		'-': ['<hr />']
	};

	/** Outdent a string based on the first indented line's leading whitespace
	 *	@private
	 */
	function outdent(str) {
		return str.replace(RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
	}

	/** Encode special attribute characters to HTML entities in a String.
	 *	@private
	 */
	function encodeAttr(str) {
		return (str+'').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	/** Parse Markdown into an HTML String. */
	function parse(md, prevLinks, onComplete) {
		let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|\n?(?:\!\[([^\]]*?)\]\(([^\)]+?)\))\n?|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)|(\| -{2,} )|( -{2,} \|)|(\| (?!\-))|(\n\| (?!\-))|(\n(?!\|))|\^.*\^/gm,
			context = [],
			out = '',
			links = prevLinks || {},
			last = 0,
			table = false, tableheader = true,
			chunk, image, caption, prev, token, inner, t;

		function tag(token) {
			var desc = TAGS[token.replace(/\*/g,'_')[1] || ''],
				end = context[context.length-1]==token;
			if (!desc) return token;
			if (!desc[1]) return desc[0];
			context[end?'pop':'push'](token);
			return desc[end|0];
		}

		function flush() {
			let str = '';
			while (context.length) str += tag(context[context.length-1]);
			return str;
		}

		md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, function(s, name, url) {
			links[name.toLowerCase()] = url;
			return '';
		}).replace(/^\n+|\n+$/g, '');

		while ( (token=tokenizer.exec(md)) ) {
			prev = md.substring(last, token.index);
			last = tokenizer.lastIndex;
			chunk = token[0];
			if (prev.match(/[^\\](\\\\)*\\$/)) {
				// escaped
			}
			// Code/Indent blocks:
			else if (token[3] || token[4]) {
				chunk = '<pre class="code '+(token[4]?'poetry':token[2].toLowerCase())+'">'+outdent(encodeAttr(token[3] || token[4]).replace(/^\n+|\n+$/g, ''))+'</pre>';
			}
			// > Quotes, -* lists:
			else if (token[6]) {
				t = token[6];
				if (t.match(/\./)) {
					token[5] = token[5].replace(/^\d+/gm, '');
				}
				inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
				if (t==='>') t = 'blockquote';
				else {
					t = t.match(/\./) ? 'ol' : 'ul';
					inner = inner.split('<br />').join('\n'); // take out the br's that have already been created.
					inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
				}
				chunk = '<'+t+'>' + inner + '</'+t+'>';
			}
			// Images:
			else if (token[8]) {
				image = encodeAttr(token[8]);
				caption = encodeAttr(token[7]);
				chunk = ' ';
				//chunk = `<img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}">`;
			}
			/* Links:
			else if (token[10]) {
				out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}">`);
				chunk = flush() + '</a>';
			}
			else if (token[9]) {
				chunk = '<a>';
			}*/
			// Headings:
			else if (token[12] || token[14]) {
				t = 'h' + (token[14] ? token[14].length : (token[13][0]==='='?1:2));
				chunk = '<'+t+'>' + parse(token[12] || token[15], links) + '</'+t+'>';
			}
			// `code`:
			else if (token[16]) {
				chunk = '<code>'+encodeAttr(token[16])+'</code>';
			}
			// Inline formatting: *em*, **strong** & friends
			else if (token[17] || token[1]) {
				chunk = tag(token[17] || '--');
			}
		/*
			else if (token[18] || token[19]) {
				tableheader = false;
				chunk = ''; // can do things to represent line if you want...
			}
			else if (token[20])   { // this could probably all be done better - but table hack 
				console.log('TABLE TAG FOUND!', token[20]);
				if (makeTable()) {
					chunk += `<tr><${tdth()}>`;
				} else {
					chunk += `</${tdth()}><${tdth()}>`;
				}
			}
			else if (token[21]) {
				console.log('TABLE 21', token[21]);
				if (!makeTable()) chunk += `</tr>`;
				chunk += `<tr><${tdth()}>`;
			}
			else if (token[22]) {
				console.log('TABLE 22', token[22]);
				if (table) {
					chunk = `</tr></table>`+token[22];
				} else {
					chunk = token[22];
				}
				table = false; // blank line is end of table
			}
	*/
			 else if (token[0]) {
				if (token[0].match(/(\^.*?\^)/g) == token[0]) {
					chunk = '<sup>'+token[0].replace(/\^/g, '')+'</sup>';
					//console.log('now', chunk);
				}
			}
			out += prev;
			out += chunk;
		}

		function tdth() {
			if (tableheader) return 'th';
			return 'td';
		}

		function makeTable() {
			if (table) {
				chunk = '';
				return false;
			} else {
				chunk = '<table>';
				table = true;
				tableheader = true;
				return true;
			}
		}

		// format html, removing forced breaks, extra whitespace & adding any missing cr's
		var html = ((out + md.substring(last) + flush()).replace(/~/g, '').replace(/\|/g, '').replace('<tr></tr>','')).trim().replace(/[\r\n]/g, '<br />');

		// remove leading line breaks
		while (html.indexOf('<br />')==0) html = html.substring(6);

		// only ever 1 image per card, maximum
		if (onComplete) onComplete(html, image, caption);
		// for when used as function
		return html;
	}	

	//////////////////////////////////////////////////////////////////////

})(typeof exports === 'undefined'? this['RedMark']={}: exports); 
