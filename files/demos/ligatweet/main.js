function $(id) {
	return document.getElementById(id);
}

($('goal').onchange = function(){
	window.goal = $('goal').value << 0 || 140;
})();

($('tweet').onpaste = $('tweet').onkeyup = $('case-insensitive').onclick = function() {
	var ligatweetTextarea = $('ligatweet'),
		tweetTextarea = $('tweet'),
		tweet = tweetTextarea.value;

	$('tweetcount').innerHTML = tweet.length;

	if(tweet.length > goal) {
		ligatweetTextarea.innerHTML = ligatweetize(tweet, goal, $('case-insensitive').checked);

		//In browsers != IE, innerHTML actually sets the default value and not the value
		if(ligatweetTextarea.defaultValue) {
			ligatweetTextarea.value = ligatweetTextarea.defaultValue;
		}

		var saved = tweet.length - ligatweetTextarea.value.length;

		$('results').innerHTML = '<strong>' + ligatweetTextarea.value.length +
						'</strong> characters. <strong>' + saved +
						'</strong> characters saved (<strong>' + Math.round(1000*saved/tweet.length || 0)/10 + '%</strong>).';
	}
	else {
		$('results').innerHTML = '<em>The tweet is already below ' + goal + ' characters. No changes performed.</em>';
		ligatweetTextarea.value = tweet;
	}
})();

document.write('<div id="conversions">');
for(var i=0; i<ligatures.length; i++) {
	for(var j=0; j<ligatures[i].length; j++) {
		for(var combo in ligatures[i][j]) {
			document.write('<dl><dt>' + combo.replace(/\\b?/g,'') + '</dt><dd>&#x' + ligatures[i][j][combo] + ';</dd></dl>');
		}
	}
}
document.write('</div>');
