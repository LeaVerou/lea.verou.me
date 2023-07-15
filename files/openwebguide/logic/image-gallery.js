var ImageGallery = function(container) {
	var me = this;
	
	// The element that contains our figures
	this.container = container || document.body;
	
	// All the figures in this gallery
	this.figures = this.container.getElementsByTagName('figure');
	
	// Holds the current figure (if any is open)
	this.current = null;

	for (var i = 0; i < this.figures.length; i++) {
		var figure = this.figures[i],
			section = figure.previousElementSibling; // to speed up references
		
		section.setAttribute("aria-hidden", "true");
		
		// add listeners to the images so they can be click focused
		figure.addEventListener('click', function() {
			if(!me.current) {
				location.hash = '#' + this.previousElementSibling.id;
			}
		}, true);
		
		// create close buttons
		var close = document.createElement('a');
			close.href = '#';
			close.innerHTML = 'Close';
			close.className = 'close';
			close.setAttribute('role', 'button');
		section.appendChild(close);
		
		// Add click event handler to svg
		var svg = figure.getElementsByTagName('object')[0];
		if(svg && svg.contentDocument) {
			svg.contentDocument.onclick = (function(id) {
				return function() {
					if(!me.current) {
						location.hash = '#' + id;
					}
				}
			})(section.id);
		}
	}
	
	window.addEventListener('hashchange', function() {
		me.checkHash();	
	}, false);
	
	document.addEventListener('keyup', function(evt) {
		if (evt.keyCode == 27 && me.current) { // Esc
			location.hash = '';
		}
	}, false);
	
	this.checkHash();
}

ImageGallery.prototype = {
	checkHash: function() {
		if (location.hash) {
			var target = document.getElementById(location.hash.substr(1));
		}
		
		if (target) {
			this.open(target);
		} 
		else {
			this.close();
		}
	},
	
	open: function(section) {
		var figure = section.nextElementSibling;
		
		if (this.current != figure) {
			this.current = figure;
		}
		
		for (var i=0; i<this.figures.length; i++) {
			var figure = this.figures[i],
				section = figure.previousElementSibling;
			
			if(figure == this.current) {
				figure.setAttribute("aria-pressed", "true");
				section.removeAttribute("aria-hidden");
				
				// Scroll the element to the middle of the window
				scrollTo(0, figure.offsetTop - (window.innerHeight - figure.clientHeight)/2);
				
				// Make the image colored
				this.pictureClass(figure, 'active');
			}
			else {
				figure.setAttribute("aria-disabled", "true");
				section.setAttribute("aria-hidden", "true");
			}
		}
		
		this.focusable(false);
	},
	
	close: function() {
		// Take care of aria attributes
		for (var i = 0; i < this.figures.length; i++) {
			var figure = this.figures[i]; // to speed up references
			
			if (figure == this.current) {
				figure.removeAttribute("aria-pressed");
				figure.previousElementSibling.setAttribute("aria-hidden", "true");
				
				// Return image to b&w
				this.pictureClass(figure, '');
			} 
			else {
				figure.removeAttribute("aria-disabled");
			}
		}
		
		this.focusable(true);
		
		this.current = null;
	},
	
	focusable: function(on) {
		var focusable = this.container.querySelectorAll("figure, a");
		
		if(on) { // separate loops for performance reasons
			for (var i = 0; i < focusable.length; i++) {
				focusable[i].setAttribute("tabindex", "0");
			}
		}
		else {
			for (var i = 0; i < focusable.length; i++) {
				focusable[i].removeAttribute("tabindex");
			}
		}
	},
	
	pictureClass: function(figure, className) {
		var svg = figure.getElementsByTagName('object')[0];
		
		if(svg && svg.contentDocument) {
			var image = svg.contentDocument.getElementsByTagName('image')[0];
			
			image.setAttribute('class', className);
		}
	}
};

// Why load instead of DOMContentLoaded? Because we want the svgs to have loaded too
addEventListener('load', function() {
	window.imageGallery = new ImageGallery();
}, false);