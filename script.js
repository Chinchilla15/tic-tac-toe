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

    const addSelection = (cell, player) => {
       const flatBoard = board.flat();

       if(cell < 0 || cell >= flatBoard.length){
        console.log("Invalid Cell Index");
        return;
       }

       const selectedCell = flatBoard[cell]

        if(selectedCell.getValue() === ""){
            selectedCell.changeValue(player);
        } else{
            console.log("Cell already taken");
        }
        
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

    const playRound = (cell) =>{
        console.log(
            `Adding ${getActivePlayer().name}'s selection into cell ${cell}`
        )
        board.addSelection(cell, getActivePlayer().value)

        /**
         * Check for winner logic here
         */

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