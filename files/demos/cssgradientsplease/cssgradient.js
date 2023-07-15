/**
 * CSS gradients parser + converter to -webkit-gradient()
 * Only supports linear gradients so far
 * @author Lea Verou
 * MIT license
 */

/**
 * Create complex regexps in an easy to read way
 * @param str {String} Final regex with {{id}} for replacements
 * @param replacements {Object} Object with the replacements
 * @param flags {String} Just like the flags argument in the RegExp constructor
 */
RegExp.create = function(str, replacements, flags) {
	for(var id in replacements) {
		var replacement = replacements[id],
			idRegExp = RegExp('{{' + id + '}}', 'gi');
		
		if(replacement.source) {
			replacement = replacement.source.replace(/^\^|\$$/g, '');
		}
		
		// Don't add extra parentheses if they already exist
		str = str.replace(RegExp('\\(' + idRegExp.source + '\\)', 'gi'), '(' + replacement + ')');
		
		str = str.replace(idRegExp, '(?:' + replacement + ')');
	}
	
	return RegExp(str, flags);
};

(function(){

var self = window.LinearGradient = function(obj) {
	this.direction = obj.direction;
	this.stops = obj.stops;
	this.fromString = obj.fromString;
}

self.prototype = {
	toWebkitGradient: function() {
		var ret = '-webkit-gradient(linear, ';
		
		// Convert direction
		if(!self.regex.keyword.test(this.direction)) {
			throw new Error('The direction is an angle that can’t be converted.');
		}
		
		var dir = [0, 0, 0, 0];
		
		if(/left/i.test(this.direction)) {
			dir[2] = '100%';
		}
		else if(/right/i.test(this.direction)) {
			dir[0] = '100%';
		}
		
		if(/top/i.test(this.direction)) {
			dir[3] = '100%';
		}
		else if(/bottom/i.test(this.direction)) {
			dir[1] = '100%';
		}
		
		ret += dir[0] + ' ' + dir[1] + ', ' + dir[2] + ' ' + dir[3] + ', ';
		
		// Convert color stops
		// TODO clean up this code
		var lp = 0, implied = 0;
		
		for(var i=0; i<this.stops.length; i++) {
			var stop = this.stops[i],
				position = stop.position;
			
			if(position === null && i > 0 && i < this.stops.length - 1) {
				stop.computedPosition = null;
				implied++;
			}
			else if(i === 0 || i === this.stops.length - 1 || self.regex.percentage.test(position)) {
				if(position === null && i === this.stops.length - 1) {
					stop.computedPosition = 1;
				}
				else {
					stop.computedPosition = parseFloat(position) / 100 || 0;
				}
				
				// Assign implied positions to color stops without one
				if(implied > 0) {
					var lpStop = this.stops[lp],
						lpPosition = lpStop.computedPosition,
						div = i - lp,
						increment = Math.max(0, (stop.computedPosition - lpPosition) / (i - lp));
					
					for(var j=i-1; j>lp; j--) {
						var computedPosition = Math.round(100 * (lpPosition + increment * (implied--))) / 100;
						this.stops[j].computedPosition = computedPosition;
					}
				}
				
				// If previous position is > than this, then this equals prev pos
				if(i > 0 && this.stops[i-1].computedPosition > stop.computedPosition) {
					stop.computedPosition = this.stops[i-1].computedPosition;
				}
				
				// update last positioned color stop
				lp = i;
				
			}
			else {
				throw new Error('The position of the ' + stop.color + ' color stop is not a percentage. Can’t convert.')
			}
			
		}
		
		for(var i=0; i<this.stops.length; i++) {
			var color = this.stops[i].color,
				position = this.stops[i].computedPosition;
			
			if(i === 0) {
				ret += position? 'color-stop(' + position + ', ' : 'from(';
			}
			else {
				ret += ', ' + (position < 1? 'color-stop(' + position + ', ' : 'to(');
			}
			
			ret += color + ')';
		}
		
		ret += ')';
		
		return ret;
	},
	
	toString: function() {
		return this.fromString;
	}
};

self.parse = function(linearGradient) {
	if(!linearGradient) {
		return null;
	}
	
	var parts = linearGradient.match(self.regex.linearGradient);
	
	if(!parts) {
		return null;
	}
	
	var direction = parts[1] || 'top';
		stops = parts[2].match(self.regex.colorStop);
		
	var angle = parseFloat(direction);
	
	if(!isNaN(angle)) {
		angle = ((angle % 360) + 360) % 360; // to make it [0, 360)
		
		switch(angle) {
			case 0: direction = 'left';
				break;
			case 90: direction = 'bottom';
				break;
			case 180: direction = 'right';
				break;
			case 240: direction = 'top';
		}
	}
		
	for(var i=0; i<stops.length; i++) {
		var stop = stops[i],
			color = stop.match(self.regex.color)[0],
			position = stop.substr(color.length).match(self.regex.length);
		
		position = position && position[0];
		
		stops[i] = {
			color: color,
			position: position
		};
	}
	
	return new LinearGradient({
		direction: direction,
		stops: stops,
		fromString: linearGradient
	});
};

self.regex = {};

self.regex.number = /^-?[0-9]*\.?[0-9]+$/;
self.regex.keyword = /^(?:top\s+|bottom\s+)?(?:right|left)|(?:right\s+|left\s+)?(?:top|bottom)$/;

self.regex.direction = RegExp.create('^(?:{{keyword}}|{{number}}deg|0)$', {
	keyword: self.regex.keyword,
	number: self.regex.number 
});

self.regex.color = RegExp.create('(?:{{keyword}}|{{func}}|{{hex}})', {
	keyword: /^(?:red|tan|grey|gray|lime|navy|blue|teal|aqua|cyan|gold|peru|pink|plum|snow|[a-z]{5,20})$/,
	func: RegExp.create('^(?:rgb|hsl)a?\\((?:\\s*{{number}}%?\\s*,?\\s*){3,4}\\)$', {
		number: self.regex.number
	}),
	hex: /^#(?:[0-9a-f]{1,2}){3}$/i
}, 'i');

self.regex.percentage = RegExp.create('^(?:{{number}}%|0)$', {
	number: self.regex.number
});

self.regex.length = RegExp.create('{{number}}{{unit}}|0', {
	number: self.regex.number,
	unit: /%|px|mm|cm|in|em|rem|en|ex|ch|vm|vw|vh/
});

self.regex.colorStop = RegExp.create('{{color}}\\s*{{length}}?', {
	color: self.regex.color,
	length: self.regex.length
}, 'gi');

self.regex.linearGradient = RegExp.create('^linear-gradient\\(\\s*(?:({{direction}})\\s*,)?\\s*({{colorstop}}\\s*(?:,\\s*{{colorstop}}\\s*)+)\\)$', {
	direction: self.regex.direction,
	colorStop: self.regex.colorStop
}, 'i');

})();