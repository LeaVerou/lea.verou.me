/**
 * Reversi
 * By Lea Verou (http://leaverou.me)
 * Licensed under an MIT license (http://www.opensource.org/licenses/mit-license.php)
 */

/**
 * Constructor
 * @param id {String} Id for the board (default: #board)
 * @param parent {HTMLElement} Board container (default: <body>)
 */
Reversi = function(id, parent) {
	var me = this;

	parent = parent || document.body;
	id = id || 'board';

	this.board = Util.createElement({
		tag: 'table',
		properties: {
			id: id,
			cellSpacing: 0,
			className: 'board'
		}
	});

	// Keeps the current state of the game
	this.state = new Array(8);

	// Add cells
	for(var i=0; i<8; i++) {
		this.state[i] = new Array(8);

		var row = Util.createElement({
			tag: 'tr',
			parent: this.board
		});

		for(var j=0; j<8; j++) {
			this.state[i][j] = 0;

			Util.createElement({
				tag: 'td',
				properties: {
					onclick: (function(row, col) {
						return function() {
							me.moveTo(row, col);
						};
					})(i, j),

					onmouseover: (function(row, col) {
						return function() {
							if(me.getReversiblePieces(row, col).length) {
								this.className = 'legal';
							}
						}
					})(i, j),

					onmouseout: function() {
						this.className = '';
					}
				},
				parent: row
			});
		}
	}

	// Dark plays first
	this.player = -1;

	// Put initial pieces
	this.moveTo(3,4, true);
	this.moveTo(3,3, true);
	this.moveTo(4,3, true);
	this.moveTo(4,4, true);

	parent.appendChild(this.board);
}

/**
 * Public instance methods
 */
Reversi.prototype = {
	/**
	 * Returns a reference to the cell at a particular position
	 * @param row {Number} Row number (0-7)
	 * @param col {Number} Column number (0-7)
	 */
	getCell: function(row, col) {
		row++;
		col++;

		if(col >0 && row > 0) {
			return this.board.querySelector('tr:nth-child(' + row + ') td:nth-child(' + col + ')');
		}

		return null;
	},

	/**
	 * Moves to particular position and updates state
	 * @param row {Number} Row number (0-7)
	 * @param col {Number} Column number (0-7)
	 * @param unchecked {Boolean} Doesn't check whether it's legal, doesn't reverse intermediate pieces
	 */
	moveTo: function(row, col, unchecked) {
		var pieces = this.getReversiblePieces(row, col);

		if(unchecked || pieces.length > 0) {
			this.put(row, col);

			// Update state
			this.state[row][col] = this.player;

			// Reverse other pieces
			for(var k = 0; k<pieces.length; k++) {
				// Update state
				//console.log(pieces[k][0], pieces[k][1]);
				this.state[pieces[k][0]][pieces[k][1]] = this.player;
				this.put(pieces[k][0], pieces[k][1]);
			}

			// Next!
			this.switchPlayer();
		}
	},

	/**
	 * Puts a piece at a particular position (if no piece is there), no questions asked
	 * @param row {Number} Row number (0-7)
	 * @param col {Number} Column number (0-7)
	 */
	put: function(row, col) {
		var cell = this.getCell(row, col),
			className = (this.player == -1? 'black' : 'white') + ' piece';

		// Is there a piece already there?
		var piece = cell.querySelector('.piece');
		if(piece) {
			// Yes, just change the class
			piece.className = className;
		}
		else {
			// Create a new piece and add it
			Util.createElement({
				tag:'div',
				properties: {
					href:'#',
					className: className
				},
				parent: cell
			});
		}
	},

	switchPlayer: function() {
		this.player = -this.player;

		Util.fireEvent(this.board, 'reversi:player-changed', { color: this.player > 0? 'white' : 'black' });
	},

	/**
	 * Checks whether the move to (row, col) is legal for the current player
	 */
	getReversiblePieces: function(row, col) {
		// First of all, the cell needs to be empty
		if(this.state[row][col] != 0) {
			return false;
		}

		// Adjacent to it should be a row/col of 1+ opposite pieces, terminated by one of our own
		var allPieces = []; // pieces that should be reversed
		
		// TODO clean this up

		for(var k=0; k<2; k++) { // row or column
			for(direction=-1; direction < 2; direction += 2) { // top/left or bottom/right
				var ij = [row, col], // this.state indices
					pieces = [];

				while((ij[k]+=direction) >= 0 && ij[k] < 8) {
					var state = this.state[ij[0]][ij[1]];

					if(state == -this.player) {
						pieces.push(ij.clone());
						continue;
					}
					else if(pieces.length > 0 && state == this.player) {
						allPieces = allPieces.concat(pieces);
					}

					pieces = [];
					break;
				}
			}
		}

		return allPieces;
	},

	/**
	 * Dumps the current state to the console (for debugging reasons)
	 */
	__dumpState: function() {
		var ret = "";
		for(var i=0; i<this.state.length;i++) {
			for(var j=0; j<this.state[i].length; j++) {
				if(this.state[i][j] != -1) {
					ret += ' ';
				}

				ret += this.state[i][j] + ' ';
			}

			ret += '\r\n';
		}

		console.log(ret);
	}
};

window.onload = function() {
	window.reversi = new Reversi(null, document.getElementById('reversi-container'));

	reversi.board.addEventListener('reversi:player-changed', function(evt) {
		// Update "Now playing"
		document.querySelector('h1 .piece').className = evt.color + ' piece';
	}, false);

}
