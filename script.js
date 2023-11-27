function GameBoard(){
    const columns = 3;
    const rows = 3
    const board = [];
    
    for (let i = 0;i < rows; i++ ){
        board [i] = [];
        for (let j = 0;j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const addSelection = (column, player) => {
        
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);


        if(!availableCells.length)return

        const upperRow = availableCells[0]
        board[upperRow][column].addValue(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };


   return{ getBoard, addSelection, printBoard }
}

function Cell(){
    let value = ""

    const addValue = (player) => {
        value = player
    }

    const getValue = () => value;

    return{
      addValue,
      getValue,
    }
}

function Players(playerOneName, playerTwoName){

        const players = [
        {
            name: playerOneName,
            value: "x"
        },
        {
            name: playerTwoName,
            value: "o"
        }
    ]
        return { players,}
}

function GameController(){

}

const newBoard = GameBoard()
newBoard.printBoard()

/* Add name to players with prompt
prompt1 = prompt("Player 1 name:")
prompt2 = prompt("Player 2 name:")
const daniel = Players(prompt1)
const david = Players(undefined,prompt2)

console.log(daniel.players[0])
console.log(david.players[1])
*/