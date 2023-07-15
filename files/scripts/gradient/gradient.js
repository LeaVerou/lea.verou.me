/**
 * Class for imageless, cross-browser linear gradients
 * @author Lea Verou
 * @version 1.0
 * MIT-style license
 */

/**
 * Constructor
 * @param width {Number} Width in pixels
 * @param height {Number} Height in pixels
 * @param startColor {String} Start color in the format #RRGGBB
 * @param endColor {String} End color in the format #RRGGBB
 * @param vertical {Boolean} Should the gradient be vertical?
 */
function Gradient(width, height, startColor, endColor, vertical) {
	this.canvas = document.createElement('canvas');
	if (!this.canvas.getContext) {
		// Hello my dear IE! How are you doing today?
		this.canvas = document.createElement('span'); // For IE7- compatibility
		this.canvas.style.display = 'inline-block';
		this.canvas.style.zoom = 1; // to give the element layout
	}
	this.resize(width, height);
	this.paint(startColor, endColor, vertical);
}

Gradient.prototype = {
	/**
	 *	Change the gradient's colors
	 *	@param startColor {String}
	 *	@param endColor {String}
	 *	@param vertical {Boolean}
	 */
	paint: function(startColor, endColor, vertical) {
		this.startColor = startColor || this.startColor || '#000000';
		this.endColor = endColor || this.endColor || '#000000';
		this.vertical = vertical !== undefined? !!vertical : this.vertical;
		
		if (this.canvas.getContext) {	
			var ctx = this.canvas.getContext('2d');
			
			var lingrad = ctx.createLinearGradient(0, 0,
												this.vertical? 0 : this.width,
												this.vertical? this.height : 0
											);
			lingrad.addColorStop(0, this.startColor);
			lingrad.addColorStop(1, this.endColor);
			
			ctx.fillStyle = lingrad;
			
			ctx.fillRect(0, 0, this.width, this.height);
		}
		else {
			this.canvas.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(' +
							'startColorStr=' + this.startColor +
							',endColorStr=' + this.endColor +
							',gradientType=' + (!this.vertical + 0) + ')';
		}
		return this;
	},
	
	/**
	 * Resize the gradient
	 * @param width {Number}
	 * @param height {Number}
	 */
	resize: function(width, height) {
		this.width = width || this.width || 0;
		this.height = height || this.height || 0;
		
		if (this.canvas.getContext) {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		}
		else {
			this.canvas.style.width = this.width + 'px';
			this.canvas.style.height = this.height + 'px';
		}
		
		return this.paint();
	},
	
	/**
	 * Swaps end color with start color
	 */
	flip: function() {
		return this.paint(this.endColor, this.startColor);
	},
	
	/**
	 * Rotates the gradient 90 degrees clockwise
	 */
	rotate: function() {
		var v = this.vertical;
		return this.paint(v? this.endColor : null, v? this.startColor : null, !v);
	}
}