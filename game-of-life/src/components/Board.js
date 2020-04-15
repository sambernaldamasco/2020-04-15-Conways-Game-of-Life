import React from 'react';

function Board(props) {
	//generating board grid
	const generateGrid = () => {
		const tableRow = [];
		for (let row = 0; row < props.boardRows; row++) {
			const tableData = [];
			for (let column = 0; column < props.boardColumns; column++) {
				tableData.push(
					<td
						key={`${row}, ${column}`}
						className={props.boardStatus[row][column] ? 'alive' : 'dead'}
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
