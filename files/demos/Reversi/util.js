/**
 * A bunch of some helper functions & native prototype methods
 * By Lea Verou (http://leaverou.me)
 * Licensed under an MIT license (http://www.opensource.org/licenses/mit-license.php)
 */

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

var Util = {
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
		if(!Util.getType(func) == 'function') {
			throw Error('The second argument in Util.each() must be a function');
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
			Util.each(source, copyFunction);
		}

		return destination;
	},
	
	/**
	 * Creates a DOM element and sets some properties on it
	 * @param options {Object} Property-value pairs to set on the newly created object
	 */
	createElement: function(options) {
		if(Util.getType(options) === 'string') {
			options = {
				tag: options
			};
		}

		var element = document.createElement(options.tag);

		if(options.properties) {
			Util.attach(element, options.properties, true);
		}

		if(options.contents) {
			element.appendChild(Util.getType(options.contents) === 'string'?
								document.createTextNode(options.contents)
									:
								options.contents);
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
			Util.attach(evt, properties, true);
		}

		target.dispatchEvent(evt);
	}
};
