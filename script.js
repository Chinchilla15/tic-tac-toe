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
       
        if(selectedCell.getValue() !== ""){
        return false;
       }else if(selectedCell.getValue() === ""){
        selectedCell.changeValue(player)
        return true;
       };
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
                return true;
            };
        };
        return false;
    };
   return{ getBoard, addSelection, isBoardFull, checkWinner, };
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
    const messageDiv = document.querySelector('.message');
    let activePlayer = players.playersInfo[0];

    const switchPlayer = () =>{
        activePlayer = activePlayer === players.playersInfo[0] ? players.playersInfo[1] : players.playersInfo[0]
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (cell) =>{
        const selectionAdded = board.addSelection(cell, getActivePlayer().value);

        if(selectionAdded){
            const winner = board.checkWinner();
            
            if(winner){
                messageDiv.textContent = `${activePlayer.name} wins!`;
                return true;
            }else if(board.isBoardFull()){
                messageDiv.textContent = "It's a draw! Game over.";
                return true;
            }else{
                messageDiv.textContent = "";
                switchPlayer()
                return false;
            };
            
        };
    };

    return{
       playRound,
       getActivePlayer,
       getBoard: board.getBoard
    };
};

function screenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const playAgainButton = document.querySelector('.playAgain')
    const messageDiv = document.querySelector('.message');
    const cellButtons = [];

    for (let i = 0; i < 9; i++){
        const cellButton = document.createElement('button');
        cellButton.classList.add('cell');
        cellButton.dataset.cell = i;
        cellButtons.push(cellButton);
        boardDiv.appendChild(cellButton);
    };

    const updateScreen = () => {
        const flatBoard = game.getBoard().flat();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        flatBoard.forEach((cell, index) => {
            const cellButton = cellButtons[index];
            cellButton.textContent = cell.getValue();
        });
    };

    function disableBoard() {
        // Disable the board by removing the click event listener
        cellButtons.forEach((button) => {
            if (!button.disabled) {
                button.removeEventListener('click', clickHandlerBoard);
                button.disabled = true;
            };
        });
    };

    function enableBoard(){
        cellButtons.forEach((button) =>{
            button.addEventListener('click', clickHandlerBoard);
            button.disabled = false
        });
    };

    function resetGame(){
       game.getBoard().forEach((row) => {
            row.forEach((cell) => {
                cell.changeValue("")
            });
        });

        enableBoard()
        playAgainButton.style.display = "none";
        messageDiv.textContent = ""
        updateScreen()
    };

    function clickHandlerBoard(e){
        const selectedCell = e.target.dataset.cell;

        if(!selectedCell) return;

        const result = game.playRound(selectedCell);

        if (result) {
            disableBoard();
            playAgainButton.style.display = 'block'
        };
      
        updateScreen();
    };

    playAgainButton.addEventListener('click', resetGame)

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
};

screenController();