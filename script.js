function GameBoard(){
    const columns = 3;
    const rows = 3
    const board = [];
    
    for (let i = 0;i < rows; i++ ){
        board [i] = [];
        for (let j = 0;j < columns; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    console.log(board)

   return{ getBoard, }
}

function cell(){
    let value = 0;

    const getValue = () => value;

    return{
        getValue,
    }
}

function Players(
    playerOneName = "Player One",
    playerTwoName = "Player Two"){

        const Players = [
        {
            name: playerOneName,
        },
        {
            name: playerTwoName
        }
    ]
        
    console.log(Players[1])
}

function GameController(){

}

Players()
GameBoard();
