document.observe('dom:loaded', function(){
	// Make the products draggable
	for(var i=1; i<=4; i++) {
		new Draggable('product_' + i, {revert:true});
	}

	// Make the cart & wastebin droppable
	Droppables.add('cart', {
		accept:'products',
		onDrop:function(element){
			updateCart('action=add&id=' + encodeURIComponent(element.id));
		},
		hoverclass:'cart-active'
	});

	Droppables.add('wastebin', {
		accept:'cart-items',
		onDrop:function(element){
			Element.hide(element);

			updateCart('action=remove&id=' + encodeURIComponent(element.id));
		},
		hoverclass:'wastebin-active'
	});

	// Adds functionality to the Clear Cart button, when clicked
	Event.observe('clear-cart', 'click', function confirmEmpty() {
		var answer = confirm('Ετοιμάζεστε να αδειάσετε το καλάθι αγορών.' +
							 'Είστε σίγουρος ότι θέλετε να συνεχίσετε;'
						);

		if (answer){
			// Empty cart
			updateCart('action=clear');
		}

		return answer;
	});
});

function updateCart(parameters) {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', 'cart.php', true);

	// Required for POST requests
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			Element.hide('indicator');

			if(xhr.status == 200 && xhr.responseText) {
				// Everything went fine, update cart contents
				$('cart').innerHTML = xhr.responseText;

				// Make the products inside the cart draggable
				$$('.cart-items').forEach(function(element) {
					new Draggable(element.id, {revert:true});
				});
			}
			else {
				// Oops!
				alert('Συνέβη κάποιο σφάλμα, παρακαλώ ξαναδοκιμάστε');
			}
		}
	};

	xhr.send(parameters);

	Element.show('indicator');
}
