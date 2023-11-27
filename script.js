function GameBoard(){
    const columns = 3;
    const rows = 3;
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


        if(!availableCells.length)return;

        const upperRow = availableCells -1;
        board[upperRow][column].changeValue(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };


   return{ getBoard, addSelection, printBoard };
}

function Cell(){
    let value = "";

    const changeValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return{
      changeValue,
      getValue,
    }
}

function Players(playerOneName = "Player One", playerTwoName = "Player Two"){

        const playersInfo = [
        {
            name: playerOneName,
            value: "x"
        },
        {
            name: playerTwoName,
            value: "o"
        }
    ]
        return { playersInfo,}
}

function GameController(){
    const board = GameBoard();
    const players = Players();
    let activePlayer = players.playersInfo[0]

    const switchPlayer = () =>{
        activePlayer = activePlayer === players.playersInfo[0] ? players.playersInfo[1] : players.playersInfo[0]
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (column) =>{
        console.log(
            `Adding ${getActivePlayer().name}'s selection into cell ${column}`
        )
        board.addSelection(column, getActivePlayer().value)



        switchPlayer();
        printNewRound();
    }

    printNewRound()

    return{
       playRound,
       switchPlayer,
       getActivePlayer
    }
}

const game = GameController();

game.playRound(2)


/*
const newBoard = GameBoard();
newBoard.printBoard();

prompt1 = prompt("Player 1 name:")
prompt2 = prompt("Player 2 name:")
const daniel = Players(prompt1)
const david = Players(undefined,prompt2)

console.log(daniel.players[0])
console.log(david.players[1])
*/