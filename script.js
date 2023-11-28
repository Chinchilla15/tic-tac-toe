function GameBoard(){
    const columns = 3;
    const rows = 3;
    const board = [];
    
    for (let i = 0;i < rows; i++ ){
        board [i] = [];
        for (let j = 0;j < columns; j++){
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    const addSelection = (cell, player) => {
       const flatBoard = board.flat();

       const selectedCell = flatBoard[cell];

       let selectionAdded = true;
       
       if(cell < 0 || cell >= flatBoard.length){
        console.log("Invalid Cell Index");
        return !selectionAdded;
       }else if(selectedCell.getValue() !== ""){
        console.log("Cell already taken")
        return !selectionAdded;
       }else if(selectedCell.getValue() === ""){
        selectedCell.changeValue(player)
        return selectionAdded;
       };
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    const isBoardFull = () => {
        return board.every((row) => row.every((cell) => cell.getValue() !== ""));
    };

    const checkWinner = () => {
        const linesToCheck = [
            //Rows
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            //columns
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            //Diagonals
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]],
        ];

        for (const line of linesToCheck){
            const [row1, col1] = line[0];
            const [row2, col2] = line[1];
            const [row3, col3] = line[2];

            const value1 = board[row1][col1].getValue();
            const value2 = board[row2][col2].getValue();
            const value3 = board[row3][col3].getValue();

            if(value1 !== "" && value1 === value2 && value2 === value3){
                return value1;
            };
        };
        return null;
    };
   return{ getBoard, addSelection, printBoard, isBoardFull, checkWinner, };
}

function Cell(){
    let value = "";

    const changeValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return{
      changeValue,
      getValue,
    };
};

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
    ];
        return { playersInfo,};
};

function GameController(){
    const board = GameBoard();
    const players = Players();
    let activePlayer = players.playersInfo[0];

    const switchPlayer = () =>{
        activePlayer = activePlayer === players.playersInfo[0] ? players.playersInfo[1] : players.playersInfo[0]
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (cell) =>{
        const selectionAdded = board.addSelection(cell, getActivePlayer().value);

        if(selectionAdded){
            const winner = board.checkWinner();
            
            if(winner){
                console.log(`${winner} wins! Congratulations, ${getActivePlayer().name}! Game over.`);
                board.printBoard();
            }else if(board.isBoardFull()){
                console.log("It's a draw! Game over.");
                board.printBoard();
            }else{
                console.log(
                    `Adding ${getActivePlayer().name}'s selection into cell ${cell}`
                );
                switchPlayer();
                printNewRound();
            };
            
        } else{
            console.log("Please try again.");
            printNewRound();
        };
    };

    printNewRound();

    return{
       playRound,
       switchPlayer,
       getActivePlayer
    };
};

const game = GameController();