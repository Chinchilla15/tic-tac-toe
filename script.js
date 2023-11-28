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
    const flatBoard = board.flat();

    const addSelection = (cell, player) => {

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
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            //columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            //Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const line of linesToCheck){
            const [index1, index2, index3] = line;

            const value1 = flatBoard[index1].getValue();
            const value2 = flatBoard[index2].getValue();
            const value3 = flatBoard[index3].getValue();

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
                return;
            }else if(board.isBoardFull()){
                console.log("It's a draw! Game over.");
                board.printBoard();
                return;
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
       getActivePlayer,
       getBoard: board.getBoard
    };
};

function screenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn')
    const boardDiv = document.querySelector('.board')

    const updateScreen = () => {
        boardDiv.textContent = "";

        const flatBoard = game.getBoard().flat();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`

        flatBoard.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add("cell");

                cellButton.dataset.cell = index;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
    }

    function clickHandlerBoard(e){
        const selectedCell = e.target.dataset.cell;

        if(!selectedCell) return;

        game.playRound(selectedCell);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen()
}


screenController();