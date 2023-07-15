/**
 * Make the environment a bit friendlier
 */
function $(expr, con) { return (con || document).querySelector(expr); }
function $$(expr, con) { return [].slice.call((con || document).querySelectorAll(expr)); }

// Ensure global vars for ids (most browsers already do this anyway, so…)
[
	'url', 'slice', 'repeat',
	'image', 'dtop', 'dright', 'dbottom', 'dleft'
].forEach(function(id) { window[id] = $('#' + id); });

var dividers = $$('#image > div'),
	img = $('img'),
	textarea = $('textarea'),
	bb = img.getBoundingClientRect(),
	borderImage = new BorderImage(img.src);
	
var changed = {
	offset: function(divider) {
		var i = dividers.indexOf(divider),
			offset = parseInt(divider.style[i % 2? 'left' : 'top']),
			dim = i % 2? 'width' : 'height',
			percentage = (i % 3? bb[dim] - offset : offset) / bb[dim];
			
		percentage = Math.round(percentage * 1000)/10;
		
		divider.setAttribute('data-percentage', percentage);
		
		borderImage.slice[i] = percentage + '%';
		
		slice.innerHTML = borderImage.slice + '';
		
		changed.something();
	},
	
	image: function() {
		bb = image.getBoundingClientRect();
		
		borderImage.source = img.src;
		
		dividers.forEach(function(d, i) {
			if(i % 2 > 0) {
				return;
			}
			
			var top = parseInt(d.style.top);
				
			if(top > bb.height) {
				d.style.top = bb.height + 'px';
			}
		});
		
		changed.something();
	},
	
	repeat: function(input) {
		borderImage.repeat = repeat.innerHTML = input.value;
		
		changed.something();
	},
	
	something: function() {
		document.body.style.cssText = textarea.value = borderImage.toCSS();
	}
}

$('header > button').onclick = function() { this.classList.toggle('show-code'); }

img.prop({
	onload: changed.image,
	
	ondragover: function(evt) {
		this.classList.add('over');
		return false;
	},
	
	ondragout: function(evt) {
		this.classList.remove('over');
	},
	
	ondrop: function(evt) {
		var files = evt.dataTransfer.files;
	
		if (files && files.length > 0) {
			var file = borderImage.file = files[0];
			console.log(file.type);
			if (window.FileReader && file.type.indexOf("image/") > -1) {
				var reader = new FileReader();
	
				reader.onload = function(evt) {
					img.src = evt.target.result;
				};
				
				reader.readAsDataURL(file);
			}
		}
		
		return false;
	}
});

dividers.forEach(function(divider) { 
	divider.prop({
		tabIndex: '0',
		onmousedown: mousedown,
		onkeydown: keydown
	});
	
	changed.offset(divider);
});

$('input[type="url"]').oninput = function() {
	img.src = this.value;
	
	changed.image();
};

$$('#repeat-details > label > input').forEach(function(input) {
	var label = input.parentNode,
		keyword = input.value;
	
	borderImage.repeat = keyword;
	
	label.style.cssText = borderImage.toCSS();
	
	label.appendChild(document.createTextNode(keyword))
	
	input.onclick = function () {
		changed.repeat(input);
	};
});
borderImage.repeat = 'stretch';


function mousedown() { 
	var me = this;

	document.onmousemove = function drag(e) {
		var x = e.pageX, y = e.pageY, 
			xy = me.className.slice(8),
			offset, percentage;
		
		if (x === 0 && y == 0) {
			return;
		}
		
		switch (xy) {
			case 'y':
				y = Math.min(Math.max(bb.top, y), bb.top + bb.height);
				me.style.top = y - bb.top + 'px';
				break;
			case 'x':
				x = Math.min(Math.max(bb.left, x), bb.left + bb.width);
				me.style.left = x - bb.left + 'px';
				break;
		}
		
		changed.offset(me);
	};
	
	document.onmouseup = function () {
		me.focus();
		
		document.onmousemove = document.onmouseup = null;
	}
}

function keydown(evt) {
	var code = evt.keyCode;
	
	if(code >= 37 && code <= 40) {
		evt.preventDefault();
		
		// Arrow keys pressed
		var left = parseInt(this.style.left),
			top = parseInt(this.style.top),
			xy = this.className.slice(8),
			offset = evt.shiftKey? 10 : 1;
		
		switch(xy) {
			case 'x':
				this.style.left = left + offset * (code - 38) + 'px'; 
				break;
			case 'y':
				this.style.top = top + offset * (code - 39) + 'px';
		}
		
		changed.offset(this);
				
		return false;
	}
}
