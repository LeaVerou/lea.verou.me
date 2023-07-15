document.addEventListener('DOMContentLoaded', function() {
	var ratingForms = document.querySelectorAll('form.rating-widget');

	for(var i=0; i<ratingForms.length; i++) {
		var form = ratingForms[i],
			input = form.querySelector('input[type="range"]'),
			size = input.getAttribute('max'),
			currentValue = input.value,
			ratingWidget = document.createElement('span');

		ratingWidget.className = 'rating-widget';

		for(var j=size; j>0; j--) {
			var star = document.createElement('a'), // <a href />, to be focusable
				rating = j;
			star.href = '#';
			star.rating = rating;

			// TODO add class "selected" to currently selected star
			if(currentValue && rating == currentValue) {
				star.className = 'selected';
			}

			star.addEventListener('click', rate, false);

			ratingWidget.appendChild(star);
		}

		// Insert the widget where the <input> used to be
		input.parentNode.replaceChild(ratingWidget, input);

		// TODO Remove the button
		var button = form.getElementsByTagName('button')[0];
		if(button) {
			button.parentNode.removeChild(button);
		}
	}
}, false);

function rate(evt) {
	var xhr = new XMLHttpRequest(),
		me = this,
		form = this.parentNode;

	while(form.nodeName.toLowerCase() != 'form') {
		form = form.parentNode;
	}

	var method = form.method;

	this.blur(); // Lose focus to prevent re-submitting

	var data = 'rating=' + this.rating;

	xhr.open(method, form.action + (method == 'GET'? '?' + data : ''), true);

	if(me.method == 'POST') {
		xhr.setRequestHeader('Content-Type', 'x-www-form-urlencoded');
	}

	// TODO add progress indicator
	var progressImg = document.createElement('img');
	progressImg.src = 'progress.gif';
	progressImg.alt = 'Please wait...';
	
	form.appendChild(progressImg);

	xhr.onreadystatechange = function (evt) {
		if(xhr.readyState == 4) {
			// TODO remove progress indicator

			if(xhr.status == 200 || xhr.status == 304) {
				var xml = xhr.responseXML;

				if(xml) {
					var otherstars = me.parentNode.getElementsByTagName('a');
					// TODO Display user's rating (add class "selected-by-me" to the star they clicked on)

					// TODO Show stats tooltip
					alert('Rating registered'); // temp
				}
			}
			else {
				alert('Error ' + xhr.status + ': ' + xhr.statusText);
			}
		}
	};

	xhr.send(method == 'POST'? data : null);

	evt.preventDefault();
}
