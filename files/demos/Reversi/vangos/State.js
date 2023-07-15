/**
* Enumeration.
* Represents the content of a cell (empty, white or black).
*/
var enCell = { "empty": 0, "white": 1, "black": 2 };

/**
* Test class:P
* Defines a Reversi state.
*/
function State(move) {

    //
    // Properties
    //

    this.move = move;
   // this.board = this.__createBoard();
}

//
// Public methods
//
State.prototype = {
	__createBoard: function(){
        // Create a new array
        var board = new Array(8);
        for (var index = 0; index < board.length; index++) {
            board[index] = new Array(8);
        }

        // Initialize the array
        for (var row = 0; row < board.length; row++) {
            for (var column = 0; column < board[row].length; column++) {
                board[row][column] = enCell.empty;
            }
        }

        return board;
    },
    /*// Prints the board's data.
    print: function() {
        var result = "<table>";
        for (var row = 0; row < this.board.length; row++) {
            resizeBy += "<tr>";
            for (var column = 0; column < this.board[row].length; column++) {
                result += "<td>" + this.board[row][column] + "</td>";
            }
            result += "</tr>";
        }

        return result + "</table>";
    }*/
};

function writeData() {
	var timeBefore = (new Date()).getTime();
	// Search-tree depth
	var depth = 6;

	// Number of child nodes
	var descendants = 10;

	//var result = "";
	// Print the remaining nodes. Xar xar xar!
	
		//result += "<p>Depth: " + i + "</p>";

		var currentNodes = Math.pow(descendants, depth);

		for (var j = 0; j < currentNodes; j++) {
			var node = new State(100);
			//result += node.print() + "<hr />";
		}
	

	postMessage(((new Date()).getTime() - timeBefore)/1000 << 0);
}

writeData();