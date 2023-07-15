function $(expr, con) { return (con || document).querySelector(expr); }
function $$(expr, con) { return [].slice.call((con || document).querySelectorAll(expr)); }

['css', 'markup', 'result'].forEach(function(id) { window[id] = $('#' + id) });
	
$$('nav input[type="radio"]').forEach(function(input){
	(input.onclick = function(){
		if(this.checked) {
			document.body.setAttribute('data-' + this.name, this.value)
		}
	}).call(input);
});
	
/*if(location.search) {
	css.value = decode(location.search.slice(1));
}*/

css.oninput = function() {
	var code = css.value,
		title = (code.match(/^\/\*[\s\*\r\n]+(.+)/) || [,null])[1];

	document.title = title + ' ✿ CSS fiddle';
	
	result.contentWindow.updateCSS(code);
};

/*css.onblur = function() {
	var code = encode(this.value);
	history.pushState(null, '', '?' + code + location.hash);
	
	var win = result.contentWindow;
	win.history.pushState(null, '', location.search + win.location.hash);
};*/

markup.oninput = function() {
	result.contentWindow.updateHTML(markup.value);
};

/*markup.onblur = function() {
	var code = encode(this.value);
	
	history.pushState(null, '', '#' + code);
	
	result.contentWindow.history.pushState(null, '', location.hash);
}*/

result.onload = function(){
	markup.oninput();
	css.oninput();
	css.onblur();
	markup.onblur();
}

$$('textarea').forEach(function(textarea){
	textarea.onkeypress = function(evt) {
		if(evt.keyCode === 9) {
			var ss = this.selectionStart,
				se = this.selectionEnd,
				before = this.value.slice(0,ss),
				after = this.value.slice(ss);
				
			if(ss === se) {
				before = before + '\t';
				
				ss++;
			}
			else {
				var lf = before.lastIndexOf('\n') + 1;
				
				if(evt.shiftKey) {
					if(/\s/.test(before.charAt(lf))) {
						before = before.slice(0,lf) + before.slice(lf+1);
						
						ss -= 1;
						se -= 1;
						
					}
				}
				else {
					before = before.slice(0,lf) + '\t' + before.slice(lf);
					
					ss++;
					se++;
				}
			}
			
			this.value = before + after;
			this.selectionEnd = se;
			this.selectionStart = ss;
			
			evt.preventDefault();
		}
	}
});

/**
 * Helper functions
 */
function encode(code) {
	return btoa(unescape(encodeURIComponent(code)))
}

function decode(encoded) {
	return decodeURIComponent(escape(window.atob(encoded)));
}

function queryToObject(search) {
	var obj = {};
	
	search.slice(1).split('&').forEach(function(pair){
		var i = pair.indexOf('=');
		
		obj[pair.slice(0,i)] = pair.slice(i+1);
	});
	
	return obj;
}

function objectToQuery(obj) {
	var search = [];
	
	for(var key in obj) {
		search.push(key + '=' + obj[key]);
	}
	
	return '?' + search.join('&');
}

var gist = {
	save: function(){
		var code = css.value,
			title = (code.match(/^\/\*[\s\*\r\n]+(.+)/) || [,null])[1],
			xhr = new XMLHttpRequest();
			
		xhr.open('POST', 'https://api.github.com/gists', true);
		xhr.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.responseText) {
				var data = JSON.parse(xhr.responseText);
				console.log(data)
			}
		};
		
		xhr.send(JSON.stringify({
			"description": title,
			"public": true,
			"files": {
				"style.css": {
					"content": code
				},
				"markup.html": {
					"content": markup.value
				}
			}
		}));
	},
	
	update: function(){
	
	},
	
	restore: function(){
	
	},
};