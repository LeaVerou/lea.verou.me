/**
 * Script to hide the native custom select element arrows 
 * @author Lea Verou
 * @version 1.0
 */

if(!('WebkitAppearance' in document.body.style)) {
	(function() {
		// Find all <select> elements
		var selects = document.getElementsByTagName('select');
		
		for(var i=0; i<selects.length; i++) {
			var select = selects[i], 
				wrapper = select.parentNode,
				width = select.offsetWidth + 30; // 30 = width of graphical arrow

			// Hide native arrow
			select.style.width = width + 'px';
			wrapper.style.width = width - 20 + 'px'; // 20 = max width of native arrow
		}
	})();
}