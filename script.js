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
                const cellButtons = document.querySelectorAll('.cell');
                [index1, index2, index3].forEach((index) => {
                    cellButtons[index].classList.add('winning-cell');
                });
                return true;
            };
        };
        return false;
    };
   return{ getBoard, addSelection, isBoardFull, checkWinner, };
};

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
            value: "X"
        },
        {
            name: playerTwoName,
            value: "O"
        }
    ];
        return { playersInfo,};
};

function GameController(){
    const board = GameBoard();
    const players = Players();
    let activePlayer = players.playersInfo[0];

    const switchPlayer = () =>{
        activePlayer = activePlayer === players.playersInfo[0] ? players.playersInfo[1] : players.playersInfo[0];
    };

    restartPlayer = () =>{
        activePlayer = activePlayer === players.playersInfo[1] ? players.playersInfo[0] : players.playersInfo[0];
    };
    
    const getActivePlayer = () => activePlayer;

    const playRound = (cell) =>{
        const selectionAdded = board.addSelection(cell, getActivePlayer().value);

        if(selectionAdded){
            const winner = board.checkWinner();
            
            let win = 'win';
            let draw = 'draw';

            if(winner){
                return win;
            }else if(board.isBoardFull()){
                return draw;
            }else{
                switchPlayer();
                return false;
            };
        };
    };

    return{
       playRound,
       getActivePlayer,
       restartPlayer,
       getBoard: board.getBoard,
    };
};

function screenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const playAgainButton = document.querySelector('.playAgain');
    const playerBox = document.querySelector('.playerBox');
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
        cellButtons.forEach((button) => {
            if (!button.disabled) {
                button.removeEventListener('click', clickHandlerBoard);
                button.disabled = true;
            };
        });
    };

    function removeHighlightClasses() {
        const cellButtons = document.querySelectorAll('.cell');
        cellButtons.forEach((button) => {
            button.classList.remove('winning-cell');
        });
    }

    function enableBoard(){
        cellButtons.forEach((button) =>{
            button.addEventListener('click', clickHandlerBoard);
            button.disabled = false;
        });
    };

    function resetGame(){
        removeHighlightClasses();
       game.getBoard().forEach((row) => {
            row.forEach((cell) => {
                cell.changeValue("")
            });
        });
        
        boardDiv.removeEventListener('click', clickHandlerBoard)
        game.restartPlayer();
        enableBoard();
        playAgainButton.style.display = "none";
        playerBox.style.display = 'flex'
        updateScreen();
    };

    function clickHandlerBoard(e){
        const selectedCell = e.target.dataset.cell;
        const winner = game.getActivePlayer();

        if(!selectedCell) return;

        const result = game.playRound(selectedCell);
        updateScreen();
        playerBox.style.display = 'none'

        if (result === "win") {
            disableBoard();
            playAgainButton.style.display = 'block';
            playerTurnDiv.textContent = `${winner.name} won!`;
        }else if(result === "draw"){
            disableBoard();
            playAgainButton.style.display = 'block';
            playerTurnDiv.textContent = "Draw!";
        };
    };

    playAgainButton.addEventListener('click', resetGame);

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
};

screenController();