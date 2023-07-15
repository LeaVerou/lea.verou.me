/**
 * Utopia: A JavaScript library that assumes modern standards support and doesn't fix any browser bugs
 * @author Lea Verou (http://leaverou.me)
 * @version 0.1
 */
 
var $ =  window.$ || function(id) { return document.getElementById(id); },
	$$ = window.$$ || function(selector) { return document.querySelectorAll(selector); };
	
/**
 * Implements Array.forEach() for browsers that don't have it
 * By Mozilla (https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/forEach)
 */
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(func, thisp) {
		var len = this.length;

		if(typeof func != 'function') {
			return;
		}

		for (var i = 0; i < len; i++) {
			if (i in this) func.call(thisp, this[i], i, this);
		}
	};
};

/**
 * Returns a shallow copy of the array
 */
if (!Array.prototype.clone) {
	Array.prototype.clone = function() {
		var result = [];

		this.forEach(function(el){
			result.push(el)
		});

		return result;
	};
}
	
var Utopia = {
	/**
	 * Returns the native class name of an object in lowercase (eg. array, date, regexp, string etc)
	 * Caution: Results for DOM elements and collections aren't reliable. Don't use to test for them!
	 * @param {Object} obj
	 *
	 * @return {String}
	 */
	getType: function(obj) {
		if(obj === null) {
			return 'null';
		}

		if(obj === undefined) {
			return 'undefined';
		}

		var ret = Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1];

		ret = ret? ret.toLowerCase() : '';

		if(ret == 'number' && isNaN(obj)) {
			ret = 'NaN';
		}

		return ret;
	},

	/**
	 * Iterate over the properties of an object. Checks whether the properties actually belong to it.
	 * Can be stopped if the function explicitly returns a value that isn't null, undefined or NaN.
	 * 
	 * @param obj {Object} The object to iterate over
	 * @param func {Function} The function used in the iteration. Can accept 2 parameters: one of the
	 * 							value of the object and one for its name.
	 * @param context {Object} Context for the above function. Default is the object being iterated.
	 *
	 * @return {Object} Null or the return value of func, if it broke the loop at some point.
	 */
	each: function(obj, func, context) {
		if(!Utopia.getType(func) == 'function') {
			throw Error('The second argument in Utopia.each() must be a function');
		};

		context = context || obj;

		for (var i in obj) {
			if(obj.hasOwnProperty && obj.hasOwnProperty(i)) {
				var ret = func.call(context, obj[i], i);

				if(!!ret || ret === 0 || ret === '') {
					return ret;
				}
			}
		}

		return null;
	},

	/**
	 * Copies the properties of one object onto another.
	 * @param destination {Object} Destination object that properties will be attached to.
	 * @param source {Object} Source object that properties will be copied from.
	 * @param aggressive {Boolean} If true it copies even properties that are already present in source. Default: false.
	 * @param which {Array<String>} Specifies the exact properties of source to copy. If null copies all properties.
	 *
	 * @return {Object} destination object
	 */
	attach: function(destination, source, aggressive, which) {
		var copyFunction = function(val, prop){
			if(aggressive || !(prop in destination)) {
				destination[prop] = val;
			}
		}

		if(which) {
			which.forEach(function(prop) {
				copyFunction(source[prop], prop);
			});
		}
		else {
			Utopia.each(source, copyFunction);
		}

		return destination;
	},
	
	/**
	 * Similar to Array.prototype.join but for objects.
	 * @param obj {Object} The object to serialize
	 * @param pairSeparator {String} The string to separate name-value pairs (default: '&')
	 * @param valueSeparator {String} The string to separate the name from the value (default: '=')
	 *
	 * @return {String} The serialized object
	 */
	serialize: function(obj, pairSeparator, valueSeparator) {
		pairSeparator = pairSeparator || '&';
		valueSeparator = valueSeparator || '=';
	
		var ret = '';
	
		Utopia.each(obj, function(value, name){
			ret += pairSeparator + name;
	
			if(value) {
				ret += valueSeparator + value;
			}
		});
	
		return ret.substring(pairSeparator.length);
	},
	
	/**
	 * Creates a new DOM element
	 * @param options {Object} A set of key/value pairs:
	 *						options.tagName: The type of the element to be created (required)
	 *						options.properties: Property-value pairs to set on the element
	 *						options.contents: String, node or document fragment to add as contents of the new element
	 *						options.parent: Add it as a child of this node
	 *
	 * @return The new DOM element
	 */
	createElement: function(options) {
		if(Utopia.getType(options) === 'string') {
			options = {
				tag: options
			};
		}

		var element = document.createElement(options.tag);

		if(options.properties) {
			Utopia.attach(element, options.properties, true);
		}
		
		if(options.attributes) {
			for(attr in options.attributes) {
				element.setAttribute(attr, options.attributes[attr]);
			}
		}

		if(options.contents) {
			var contents = options.contents;
			
			if(Utopia.getType(contents) != 'array') {
				contents = [contents];
			}
			
			for(var i=0; i<contents.length; i++) {
				element.appendChild(Utopia.getType(contents[i]) === 'string'?
								document.createTextNode(contents[i])
									:
								contents[i]);
			}
			
				
		}

		return options.parent? options.parent.appendChild(element) : element;
	},
	
	/**
	 * Fire a custom event (standards way only - no IE event model here)
	 */
	fireEvent: function(target, type, properties) {
		var evt = document.createEvent("HTMLEvents");

		evt.initEvent(type, true, true );
		evt.custom = true;

		if(properties) {
			Utopia.attach(evt, properties, true);
		}

		target.dispatchEvent(evt);
	},
	
	getTotalOffsetLeft: function(element) {
		var ret = 0;
		
		do {
			ret += element.offsetLeft;
		} while(element = element.offsetParent);
		
		return ret;
	},
	
	getTotalOffsetTop: function(element) {
		var ret = 0;
		
		do {
			ret += element.offsetTop;
		} while(element = element.offsetParent);
		
		return ret;
	}
};

