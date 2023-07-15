/**
 * Class for imageless, cross-browser linear gradients
 * @author Lea Verou
 * @version 2.0.1
 * MIT-style license
 */

/**
 * Constructor
 * @param width {Number} Width in pixels
 * @param height {Number} Height in pixels
 * @param colors {String} Start color in the format #RRGGBB
 * @param vertical {Boolean} Should the gradient be vertical?
 */
function Gradient(width, height, colors, vertical) {
	this.canvas = document.createElement('canvas');
	if (!this.canvas.getContext) {
		// Hello my dear IE! How are you doing today?
		this.canvas = document.createElement('span'); // For IE7- compatibility
		this.canvas.style.display = 'inline-block';
		this.canvas.style.zoom = 1; // to give the element layout
		this.canvas.style.overflow = 'hidden'; // shit happens...
	}
	this.colors = colors;
	this.vertical = vertical;
	this.resize(width, height);
}

Gradient.prototype = {
	/**
	 *	Change the gradient's colors
	 *	@param startColor {String}
	 *	@param endColor {String}
	 *	@param vertical {Boolean}
	 */
	paint: function(colors, vertical) {
		this.colors = colors || this.colors;

		this.vertical = vertical !== undefined? !!vertical : this.vertical;

		if(!this.colors) {
			return this;
		}

		if (this.canvas.getContext) {
			var ctx = this.canvas.getContext('2d');

			ctx.clearRect(0, 0, this.width, this.height);

			var lingrad = ctx.createLinearGradient(0, 0,
												this.vertical? 0 : this.width,
												this.vertical? this.height : 0
											);


			for(var i=0; i<this.colors.length; i++) {
				var color = this.colors[i];
				if(color == 'transparent') {
					if(this.colors[i-1]) {
						color = 'rgba(' + this.__getRGB(this.colors[i-1]).join(',') + ',0)';
						lingrad.addColorStop(i/(this.colors.length-1), color);
					}

					if(this.colors[i+1]) {
						color = 'rgba(' + this.__getRGB(this.colors[i+1]).join(',') + ',0)';
					}
				}

				lingrad.addColorStop(i/(this.colors.length-1), color);

			}

			ctx.fillStyle = lingrad;

			ctx.fillRect(0, 0, this.width, this.height);
		}
		else {
			this.canvas.innerHTML = "";
			if(this.colors.length == 2) {
				var sc = this.colors[0], ec = this.colors[1];

				if(sc == 'transparent') sc = '#00' + ec.substr(1);
				if(ec == 'transparent') ec = '#00' + sc.substr(1);

				this.canvas.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(' +
							'startColorStr=' + sc +
							',endColorStr=' + ec +
							',gradientType=' + (!this.vertical + 0) + ')';
			}
			else {
				var totalDim = this[this.vertical? 'height' : 'width'];
				for(var i=0; i<this.colors.length - 1; i++) {
					var span = document.createElement('span'), spanDim;

					totalDim -= spanDim = Math.round(this[this.vertical? 'height' : 'width']/(this.colors.length-1));

					if(i == this.colors.length - 2) {
						spanDim += totalDim;
					}

					span.style[this.vertical? 'height' : 'width'] = spanDim + 'px';

					span.style[this.vertical? 'width' : 'height'] = this[this.vertical? 'width' : 'height'] + 'px';

					span.style.display = 'block';

					if(!this.vertical) {
						span.style.cssFloat = span.style.styleFloat = 'left';
					}

					var sc = this.colors[i], ec = this.colors[i+1];

					if(sc == 'transparent') sc = '#00' + ec.substr(1);
					if(ec == 'transparent') ec = '#00' + sc.substr(1);

					span.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(' +
							'startColorStr=' + sc +
							',endColorStr=' + ec +
							',gradientType=' + (!this.vertical + 0) + ')';

					this.canvas.appendChild(span);
				}
			}
		}
		return this;
	},

	/**
	 * Set the color at a particular index
	 * @param ind {Number} The index of the color, starting from 0
	 * @param color {String} the color in #RRGGBB format or the keyword 'transparent'
	 */
	setColorAt: function(ind, color) {
		ind = Math.min(this.colors.length-1, Math.max(0, ind));
		this.colors[ind] = color;
		return this.paint();
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
	 * Changes the direction of the gradient (true for vertical, false for horizontal).
	 * If no parameters are passed, it toggles from vertical to horizontal and vice versa.
	 */
	direction: function(dir) {
		this.vertical = arguments.length? dir : !this.vertical;
		return this.paint();
	},

	/**
	 * Swaps end color with start color
	 */
	flip: function() {
		this.colors = this.colors.reverse();
		return this.paint();
	},

	/**
	 * Rotates the gradient 90 degrees clockwise
	 */
	rotate: function() {
		if(this.vertical) this.flip();
		return this.direction();
	},

	__getRGB: function(hex) {
		hex = hex.substr(1);
		return [
				parseInt(hex.substring(0,2), 16),
				parseInt(hex.substring(2,4), 16),
				parseInt(hex.substring(4), 16)
			];
	}
}
