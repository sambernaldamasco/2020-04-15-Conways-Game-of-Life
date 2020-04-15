import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
// Any alive cell that is touching less than two alive neighbours dies.
// Any alive cell touching four or more alive neighbours dies.
// Any alive cell touching two or three alive neighbours does nothing.
// Any dead cell touching exactly three alive neighbours becomes alive.

//number of rows/columns
const boardRows = 50;
const boardColumns = 50;

//cellInitialStatus returns random true/false value to identify alive/dead statuses
//and it's the default value for the argument
const generateBoardStatus = (
	cellInitialStatus = () => Math.random() >= 0.8
) => {
	const grid = [];
	//generating the rows
	for (let row = 0; row < boardRows; row++) {
		grid[row] = [];
		//generating the columns and associating the cell status with it
		for (let column = 0; column < boardColumns; column++) {
			grid[row][column] = cellInitialStatus();
		}
	} //end of for loop

	return grid;
};

function App() {
	//creating state for boardStatus to be passed as props
	const [boardStatus, setBoardStatus] = useState(generateBoardStatus());

	//boolean for start/pause
	const [runGame, setRunGame] = useState(false);

	//takes the index for row/column when called and evaluates if
	//the cell is on the board and reduce the neighbor cells to an array only with cells that are true
	const aliveCells = (row, column) => {
		//checking only the 4 imminent "neighbour" cells
		const neighbourCells = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, 1],
			[1, 1],
			[1, 0],
			[1, -1],
			[0, -1],
		];

		return neighbourCells.reduce((aliveCells, cells) => {
			const rowPosition = row + cells[0];
			const columnPosition = column + cells[1];

			const isCellOnBoard =
				rowPosition >= 0 &&
				rowPosition < boardRows &&
				columnPosition >= 0 &&
				columnPosition < boardColumns;

			if (
				aliveCells < 4 &&
				isCellOnBoard &&
				boardStatus[rowPosition][columnPosition]
			) {
				return aliveCells + 1;
			} else {
				return aliveCells;
			}
		}, 0);
	}; //closing function alive cells

	const updateBoard = () => {
		//having to do this due to JS not allowing clone of multidimensional arrays
		let clonedBoard = JSON.parse(JSON.stringify(boardStatus));

		for (let r = 0; r < boardRows; r++) {
			for (let c = 0; c < boardColumns; c++) {
				const totalAliveCells = aliveCells(r, c);
				if (!boardStatus[r][c]) {
					if (totalAliveCells === 3) clonedBoard[r][c] = true;
				} else {
					if (totalAliveCells < 2 || totalAliveCells > 3)
						clonedBoard[r][c] = false;
				}
			} //closing column for
		} //closing row for
		return clonedBoard;
	};

	useEffect(() => {
		setTimeout(() => {
			setBoardStatus(updateBoard());
		}, 300);
	}, [boardStatus]);

	return (
		<div className="App">
			<Board
				boardStatus={boardStatus}
				boardRows={boardRows}
				boardColumns={boardColumns}
			/>
		</div>
	);
}

export default App;
