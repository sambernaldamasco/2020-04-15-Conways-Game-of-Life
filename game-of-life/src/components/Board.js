import React from 'react';

function Board() {
	const boardRows = 10;
	const boardColumns = 10;

	//returns random true/false value to identify alive/dead statuses
	const cellInitialStatus = () => Math.random() >= 0.5;

	const generateBoardStatus = () => {
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

	//generating board grid
	const generateGrid = () => {
		const boardStatus = generateBoardStatus();
		const tableRow = [];

		for (let row = 0; row < boardRows; row++) {
			const tableData = [];
			for (let column = 0; column < boardColumns; column++) {
				tableData.push(
					<td
						key={`${row}, ${column}`}
						className={boardStatus[row][column] ? 'alive' : 'dead'}
					/>
				);
			} //end of column for
			tableRow.push(<tr key={row}>{tableData}</tr>);
		} //end of row for

		return (
			<table>
				<tbody> {tableRow}</tbody>
			</table>
		);
	};

	const finalGrid = generateGrid();
	return finalGrid;
}

export default Board;
