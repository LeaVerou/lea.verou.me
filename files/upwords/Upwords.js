var Upwords = function(players) {
	var me = this;
	
	this.board = $('board');
	this.players = players;
	this.words = {};
	this.player = 0; // index of player whose turn it is
	
	// Add cells
	for(var i=0; i<100; i++) {
		var cell = Utopia.createElement({
			tag: 'div',
			parent: this.board,
			properties: {
				className: 'cell' + ([44, 45, 54, 55].indexOf(i) > -1  ? ' eligible' : ''),
				tabindex: '0'
			},
			attributes: {
				'data-row': (i / 10 >> 0) + 1,
				'data-col': i % 10 + 1
			}
		});
		
		cell.addEventListener('DOMNodeInserted', function(evt) {
			me.setEligibleCells(this);
		}, false);
		
		cell.addEventListener('DOMNodeRemoved', function(evt) {
			me.setEligibleCells(this);
		}, false);
	}
};

Upwords.prototype = {
	get player() {
		return this._player;
	},
	
	set player(ind) {
		this._player = ind;
		
		this.getCurrentPlayer().play();
		
		if(this.words.length) {
			// Confirm words
		}
		else {
			this.drawLetters();
		}
	},
	
	getCurrentPlayer: function() {
		return this.players[this.player];
	},
	
	getCell: function(i, j) {
		if(i <= 0 || i > 10) {
			return null;
		}
		
		return this.board.children[10 * (i-1) + j - 1];
	},
	
	// Inverse of getCell()
	getCellCoords: function(cell) {
		return [
			+cell.getAttribute('data-row'),
			+cell.getAttribute('data-col')
		];
	},
	
	getLetter: function(cell) {
		return cell.textContent.substr(-1);
	},
	
	setEligibleCells: function(cell) {
		var coords = this.getCellCoords(cell),
			i = coords[0], j = coords[1];
		cell.classList[cell.children.length >= 5? 'remove' : 'add']('eligible');
		
		var adjacentCells = [
			this.getCell(i-1, j),
			this.getCell(i, j-1),
			this.getCell(i, j+1),
			this.getCell(i+1, j)
		];
		
		for(var i=0; i<adjacentCells.length; i++) {
			if(adjacentCells[i] && adjacentCells[i].children.length < 5) {
				adjacentCells[i].classList.add('eligible');
			}
		}
	},
	
	put: function(letter, i, j) {
		var cell = this.getCell(i, j);
		
		if(cell.children.length < 5) {
			// Check if letter already exists
			if((new RegExp(letter, 'i')).test(cell.textContent)) {
				this.error('Letter ' + letter + ' already exists in the stack', i, j);
				return false;
			}
			else {
				// We may add a new letter
				if(Utopia.getType(letter) == 'string') {
					var letter = Utopia.createElement({
						tag: 'div', 
						contents: letter,
						properties: {
							className: 'letter',
							ontouchstart: function(){}
						}
					});
				}
				
				cell.appendChild(letter);
				
				return true;
			}
		}
		else {
			this.error('Already 5 letters in this position', i, j);
			return false;
		}
	},
	
	error: function(message, i, j) {
		// TODO make this less intrusive
		alert(message, i, j);
	},
	
	drawLetters: function() {
		var currentPlayer = this.getCurrentPlayer(),
			remaining = 7 - currentPlayer.tray.children.length,
			letters = 0;
		
		// Find how many letters are remaining
		for(var letter in this.letters) {
			letters += this.letters[letter];
		}
		
		// draw {remaining} tiles at random
		drawloop: for(var i=0; i<remaining; i++) {
			var letterNo = Math.round((Math.random() + Math.random())/2 * letters),
				lettersBefore = 0;
			
			for(var letter in this.letters) {
				var count = this.letters[letter];
				
				if(count > 0 && lettersBefore + count > letterNo) {
					// This is our letter
					currentPlayer.addToTray(letter);
					this.letters[letter]--;
					letters--;

					continue drawloop;
				}
				else {
					lettersBefore += count;
				}
			}
			
			// If we're here, no letter was picked, so we ran out of tiles
			this.endGame('There are no more tiles');
			return;
		}
	},
	
	endGame: function(reason) {
		// Remove 5 from the score for each unused tile
		for(var i=0; i<this.players.length; i++) {
			var player = this.players[i];
			
			player.score -= player.tray.querySelectorAll('.letter').length;
		}
		
		// Find who won
		var maxScore = this.players[0].score,
			winners = [this.players[0]];
		
		for(var i=1; i<this.players.length; i++) {
			var player = this.players[i];
			
			if(player.score > maxScore) {
				// New max score, wipe out winners
				maxScore = player.score;
				winners = [player];
			}
			else if(player.score == maxScore) {
				winners.push(player);
			}
		}
		
		// Put an overlay over everything, so that things can't be clicked/tapped any more
		Utopia.createElement({
			tag: 'div',
			parent: document.body,
			properties: {
				className: 'overlay'
			}
		});
		
		alert('Game ended: ' + reason + '.\r\n' + 
				(winners.length == 1? winners[0] + ' won'
					:
				 'Tie between ' + winners.join(', ')	
				)
			);
	},
	
	giveUp: function() {
		var gaveUp = this.getCurrentPlayer().gaveUp = confirm('You didn\'t use any tiles. ' + 
						'Are you sure you want to give up your turn? ' +
						'If the opponent quits too, the game will end.');
		
		// Check if everyone has quit
		if(gaveUp) {
			for(var i=0; i<this.players.length; i++) {
				if(!this.players[i].gaveUp) {
					break;
				}
			}
			
			if(i === this.players.length) {
				// Everyone gave up, end the game
				this.endGame('Everyone has given up in succession');
			}
		}
			
		return gaveUp;
	},
	
	showWordsDialog: function() {
		var freshLetters = this.board.querySelectorAll('.fresh.letter'),
			wordsDialog = $('suggested-words'),
			wordsList = wordsDialog.querySelector('ul');
		
		wordsList.innerHTML = '';
		/*
			<li>
				<input type="checkbox" id="word-duck" />
				<label for="word-duck" onclick>DUCK <span class="score">8</span></label>	
			</li>
		*/
		for(var word in this.words) {
			var checkbox = Utopia.createElement({
				tag: 'input',
				properties: {
					type: 'checkbox',
					id: 'word-' + word,
					checked: word.length > 1
				}
			});
			
			var label = Utopia.createElement({
				tag: 'label',
				contents: word,
				properties: {
					onclick: function(){},
					htmlFor: 'word-' + word
				}
			});
			
			Utopia.createElement({
				tag: 'span',
				parent: label,
				contents: this.words[word] + '',
				properties: {
					className: 'score'
				}
			});
			
			Utopia.createElement({
				tag: 'li',
				parent: wordsList,
				contents: [checkbox, label]
			});
		}
		
		wordsDialog.style.display = 'block';
		
		var me = this;
		wordsDialog.onsubmit = function(evt) {
			var player = me.getCurrentPlayer(),
				oldScore = player.score;
				
			evt.preventDefault();
			
			// Hide form
			this.style.display = 'none';
			
			// Add score
			for(var i=0; i<wordsList.children.length; i++) {
				var wordLi = wordsList.children[i],
					checkbox = wordLi.querySelector('input[type="checkbox"]'),
					word = checkbox.id.substr(5);
					
				if(checkbox.checked) {
					player.score += +me.words[word];
				}
				else {
					delete me.words[word];
				}
			}
			
			// Return unused tiles, if any
			for(var i=0; i<freshLetters.length; i++) {
				var validWords = 0;
				
				for(var word in freshLetters[i].words) {
					if(word in me.words) {
						validWords++;
					}
				}
				
				if(!validWords) {
					player.tray.appendChild(freshLetters[i]);
				}
			}
			
			freshLetters = me.board.querySelectorAll('.fresh.letter');
			
			// Check if there are any tiles left and warn against quitting
			if(freshLetters.length === 0) {
				if(!me.giveUp()) {
					player.score = oldScore;
					return;
				}
			}
			
			
			// Convert fresh letters to letters
			for(var i=0; i<freshLetters.length; i++) {
				var coords = me.getCellCoords(freshLetters[i].parentNode);
				
				// Destroy the fresh tile
				freshLetters[i].parentNode.removeChild(freshLetters[i]);
				
				// Add new tile
				me.put(freshLetters[i].textContent, coords[0], coords[1]);
			}
			
			// Change player				
			me.nextPlayer();
			
			return false;
		}	
	},
	
	finishTurn: function() {
		var freshLetters = this.board.querySelectorAll('.fresh.letter'),
			player = this.getCurrentPlayer();
			
		this.words = {};
		
		if(freshLetters.length === 0) {
			if(!this.giveUp()) {
				return;
			}
			
			this.nextPlayer();
		}
		else {
			// Detect possible words and present them to the player
			for(var i=0; i<freshLetters.length; i++) {
				var coords = this.getCellCoords(freshLetters[i].parentNode);
				
				freshLetters[i].words = {};
				
				for(var o=0; o<2; o++) {
					var word = '', 
						score = 0,
						bonus = 0;
					
					if(this.bonusLetters.indexOf(freshLetters[i].textContent) > -1) {
						score = bonus = 2;
					}
					
					for(var j=1; j<=10; j++) {
						var cell = o == 1? this.getCell(coords[0], j) : this.getCell(j, coords[1]),
							letter = this.getLetter(cell);
		
						if(!letter && j<coords[o]) {
							word = '';
							score = bonus;
						}
						else if(!letter && j>coords[o]) {
							break;
						}
						else {
							word += letter;
							score += cell.children.length;
						}
					}
					
					if(score == word.length + bonus) {
						// All tiles at the same bottom level
						score *= 2;
					}
											
					if(!(word in this.words) || this.words[word] < score) {
						this.words[word] = score;
					}
					
					if(!(word in freshLetters[i].words) || freshLetters[i].words[word] < score) {
						freshLetters[i].words[word] = score;
					}
				}
				
			}
			
			this.showWordsDialog();
		}
	},
	
	nextPlayer: function() {
		if(this.player > this.players.length - 2) {
			this.player = 0;
		}
		else {
			this.player++;
		}
	},
	
	// Letters and availability
	letters: {
		'A': 9,
		'B': 2,
		'C': 2,
		'D': 4,
		'E': 12,
		'F': 2,
		'G': 3,
		'H': 2,
		'I': 9,
		'J': 1,
		'K': 1,
		'L': 4,
		'M': 2,
		'N': 6,
		'O': 8,
		'P': 2,
		'Q': 1,
		'R': 6,
		'S': 4,
		'T': 6,
		'U': 4,
		'V': 2,
		'W': 2,
		'X': 1,
		'Y': 2,
		'Z': 1
	},
	
	bonusLetters: ['J', 'Q', 'X', 'Z']
};

var Player = function(name) {
	var me = this;
	
	this.name = name;
	this._score = 0;

	this.gaveUp = false;
	
	this.playerStuff = Utopia.createElement({
		tag: 'div',
		properties: {
			id: this.name.toLowerCase(),
			className: 'player-stuff'
		}
	});
	
	this.scoreElement = Utopia.createElement({
		tag: 'span',
		contents: this.score + '',
		properties: {
			className: 'player-score'
		}
	});
	
	Utopia.createElement({
		tag: 'div',
		contents: [this.name, this.scoreElement],
		properties: {
			className: 'player-name'
		},
		parent: this.playerStuff
	});
	
	this.tray = Utopia.createElement({
		tag: 'div',
		properties: {
			className: 'tray'
		},
		parent: this.playerStuff
	});
	
	document.body.appendChild(this.playerStuff);
};

Player.prototype = {
	get score() {
		return this._score;
	},
	
	set score(val) {
		this.scoreElement.innerHTML = this._score = val;
	},
	
	play: function() {
		this.gaveUp = false;
		
		var id = this.name.toLowerCase();
		
		location.hash = '#' + id + 'a';
		location.hash = '#' + id;
	},
	
	addToTray: function(letter) {
		var me = this;
		
		var letter = Utopia.createElement({
			tag: 'div', 
			contents: letter,
			parent: this.tray,
			properties: {
				className: 'fresh letter',
				ontouchstart: function(evt){
					this.style.left = Utopia.getTotalOffsetLeft(this) + 'px';
					this.style.top = Utopia.getTotalOffsetTop(this) + 'px';
					this.classList.add('dragged');
					
					document.body.appendChild(this);
					
					document.addEventListener('touchmove', me.letterDrag, false);
					document.addEventListener('mousemove', me.letterDrag, false);
				},
				ontouchend: function(evt) {
					document.removeEventListener('touchmove', me.letterDrag, false);
					document.removeEventListener('mousemove', me.letterDrag, false);
					
					// Is it dropped at an eligible spot?
					x = this.offsetLeft + this.offsetWidth/2,
					y = this.offsetTop + this.offsetHeight/2;
					
					this.classList.remove('dragged');	
					this.style.top = '';
					this.style.left = '';
					
					// Is it over an eligible spot? If so, highlight the spot
					this.style.display = 'none';
					var overElement = document.elementFromPoint(x, y);
					this.style.display = '';
					
					if(overElement.classList.contains('letter')) {
						overElement = overElement.parentNode;
					}
					
					if(overElement 
					  && overElement.classList.contains('eligible')
					  && overElement.classList.contains('considered')
					  && !overElement.querySelector('.fresh.letter')) {
					  	// Add tile to cell
						var tile = overElement.appendChild(this);
						
						if(overElement.children.length >= 5) {
							overElement.classList.remove('eligible');
							overElement.classList.remove('considered');
						}
					}
					else {
						// Return to tray
						me.tray.appendChild(this);
					}
				}
			}
		});
		
		letter.onmousedown = letter.ontouchstart;
		letter.onmouseup = letter.ontouchend;
	},
	
	letterDrag: function(evt) {
		if(evt.touches) {
			if(evt.touches.length > 1){ // Only deal with one finger
				return;
			}
			else {
				var x = evt.touches[0].pageX,
					y = evt.touches[0].pageY;
			}
		}
		else {
			// Mouse event, get traditional pageX/Y
			var x = evt.pageX, y = evt.pageY;
		}
		
		var letter = $$('.fresh.dragged.letter')[0];
		
		letter.style.left = x + "px";
		letter.style.top = y + "px";
		
		var centerX = x + letter.offsetWidth/2,
			centerY = y + letter.offsetHeight/2;
		
		// Remove considered spot highlight
		var considered = $$('.considered');
		for(var i=0; i<considered.length; i++) {
			considered[i].classList.remove('considered');
		}
		
		// Is it over an eligible spot? If so, highlight the spot
		letter.style.display = 'none';
		var overElement = document.elementFromPoint(centerX, centerY);
		letter.style.display = '';
		
		if(overElement && overElement.classList.contains('letter')) {
			overElement = overElement.parentNode;
		}
		
		if(overElement && overElement.classList.contains('eligible')) {
			overElement.classList.add('considered');
		}
		
	},
	
	toString: function() {
		return this.name;
	}
};

document.addEventListener('touchmove', function(evt) {
	evt.preventDefault();
}, false);

var dialogs = $$('form.dialog');
for(var i=0; i<dialogs.length; i++) {
	dialogs[i].addEventListener('submit', function(evt) {
		this.style.display = '';
		evt.preventDefault();
		return false;
	}, false);
}

$('enter-players').onsubmit = function(evt) {
	var inputs = this.getElementsByTagName('input'),
		players = [];
	
	for(var i=0; i<inputs.length; i++) {
		players.push(new Player(inputs[i].value));
	}
	
	// TODO shuffle array and announce who's playing first
	
	window.upwords = new Upwords(players);
}