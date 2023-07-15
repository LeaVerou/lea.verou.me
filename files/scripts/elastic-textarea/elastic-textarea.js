/**
 * @description An experimental script for elastic textareas
 * @author Lea Verou
 * @version Alpha 1
 * @license MIT license (http://www.opensource.org/licenses/mit-license.php)
 **/

function elasticize(textareas) {
	var overflowY = 'overflow' + ('overflowY' in document.getElementsByTagName('script')[0].style? 'Y' : ''),
		bindEvents = function(events, element, callback) {
			if(element.addEventListener) {
				for(var i=0; i<events.length; i++) {
					element.addEventListener(events[i], callback, 0);
				}
			}
			else if(element.attachEvent) {
				for(var i=0; i<events.length; i++) {
					element.attachEvent('on' + events[i], callback);
				}
			}
		};

	for(var i=0; i<textareas.length; i++) {
		textareas[i].style[overflowY] = 'hidden';
		textareas[i].__originalRows = textareas[i].rows;

		var callback = function(evt) {
			var t = evt.target || evt.srcElement || this,
				// Keep the scrollTop, since we'll restore it afterwards if overflowY != hidden
				oldScrollTop = t.scrollTop;

			// If there's no scrollbar, it resets to 0. This way we can test if the textarea is scrollable
			t.scrollTop = 1;

			while(t.scrollTop > 0) {
				// It can scroll, so make it longer
				var oldHeight = t.clientHeight,
					grew = true;

				t.rows++;

				if(t.clientHeight == oldHeight) {
					// Height didn't change, probably due to a max-height restriction
					// Exit this function and restore the overflow, so that we have a scrollbar.
					if(t.style[overflowY]) {
						t.style[overflowY] = '';
					}

					t.scrollTop = oldScrollTop;

					return;
				}

				// perhaps +1 row is not enough, do it again
				t.scrollTop = 1;
			}

			// If it doesn't need to grow, perhaps it needs to shrink...
			if(!grew) {
				while(t.scrollTop == 0 && t.rows > t.__originalRows) {
					// It can't scroll, try making it shorter and see if it still can't
					t.rows--;

					// and try again...
					t.scrollTop = 1;
				}

				// If it's now scrollable, make it slightly larger
				if(t.scrollTop > 0) {
					t.rows++;
				}
			}

			if(!t.style[overflowY]) {
				// It might have been cleared previously but scrollbars are not necessary any more
				t.style[overflowY] = 'hidden';
			}
		};

		bindEvents(['keyup', 'paste'], textareas[i], callback);

		// Call it, since the textarea might already have too much/too little text
		callback({target: textareas[i]});
	}
}
