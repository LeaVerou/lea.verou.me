(function(){
	
var self = window.BorderImage = function (url, slice, repeat) {
	this.source = url;
	this.slice = slice || ['33.34%', '33.34%', '33.34%', '33.34%'];
	this.repeat = repeat || 'stretch';
	
	this.slice.toString = function() {
		var copy = this.slice();
		
		if(this[3] == this[1]) {
			delete copy[3];
			
			if(this[2] == this[0]) {
				delete copy[2];
				
				if(this[1] == this[0]) {
					delete copy[1];
				}
			}
		}
		
		return copy.join(' ');
	};
};

BorderImage.prototype = {
	file: null,
	
	toString: function() {
		return 'border-image: url(' + 
			this.source + ') ' + 
			this.slice + 
			' ' + this.repeat +
			';';
	},
	
	toCSS: function() {
		var me = this,
		    border = 'border: 10px solid transparent;'; // TODO configurable border
		
		return border + self.prefixes
			.map(function(prefix) { return '\r\n' + prefix + me })
			.reverse()
			.join('');
	}
};

self.prefixes = ['', '-moz-', '-o-', '-webkit-'];
self.prefix = (function(style) {
		for (var i=self.prefixes.length; i--;) {
			var prefix = self.prefixes[i];
			
			style.cssText = prefix + 'border-image:inherit';
			
			if (style.getPropertyValue(prefix + 'border-image')) {
				return prefix;
			}
		}
		
		return null;
	})(document.createElement('a').style);

})();