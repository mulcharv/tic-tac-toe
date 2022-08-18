
const Player = (type) => {
    const getType = () => type;

    return {
        getType
    }
};

const displayController = (() => {

    let turnArray = [];
    let src = [];
    const gbsquare = document.getElementsByClassName('gbsquare');
    const turnDisplay = document.getElementById('turnDisplay');
    const winDisplay = document.getElementById('winDisplay');
    const restart = document.getElementById('restart');
    let playerTurn;

    for (i=0; i<gbsquare.length; i++) {
        gbsquare[i].addEventListener('click', (e) => {
        if (e.target.childNodes.length == 0 && winDisplay.childNodes.length == 0) {

            const playerX = Player('X');
            const playerO = Player('O');

    
            if (turnArray.length == 0) {
                playerTurn = playerO.getType();
                turnArray.push('X');
                e.target.textContent = 'X';
                src[Number(e.target.id)-1] = 'X';
                turnDisplay.textContent = `Player ${playerTurn}'s Turn`
            }
    
    
            else if (turnArray[turnArray.length - 1] == 'X') {
                playerTurn = playerX.getType();
                turnArray.push('O');
                e.target.textContent = 'O';
                src[Number(e.target.id)-1] = 'O';
                turnDisplay.textContent = `Player ${playerTurn}'s Turn`
            }
    
            else {
                playerTurn = playerO.getType(); 
                turnArray.push('X');
                e.target.textContent = 'X';
                src[Number(e.target.id)-1] = 'X';
                turnDisplay.textContent = `Player ${playerTurn}'s Turn`
            }
        
        }
            
        
            })

        }

        restart.addEventListener('click', () => {
            src.length =0;
            turnArray.length =0;
            turnDisplay.textContent = `Player X's Turn`;
            winDisplay.textContent = '';
            for (i=0; i<gbsquare.length; i++) {
                gbsquare[i].textContent = '';
            }
        } )

    return {src};


})();


const gameBoard = (() => {

    const gbsquare = document.getElementsByClassName('gbsquare');
    const restart = document.getElementById('restart');

        let rowNum = 3;
        let colNum = 3;
        let dest = new Array(rowNum);
    
    for (i=0; i<gbsquare.length; i++) {
        gbsquare[i].addEventListener('click', (e) => {
        const src = displayController.src;
        let k = 0;
    for (x=0; x<rowNum; x++) {
        let tmp = new Array(colNum);
        for (j=0; j<colNum; ++j) {
            tmp[j] = src[k];
            k++;
        }

        dest[x] = tmp;
    }
    })}

    restart.addEventListener('click', () => {
        dest.length =0;
    })

    return {dest};
})();

const gameFlow = (() => {
    const gbsquare = document.getElementsByClassName('gbsquare');
    const winDisplay = document.getElementById('winDisplay');

    const arrayColumn = (arr, n) => arr.map((x) => x[n]);
    const allEqual = (arr) => arr.every(val => val === arr[0]);

    for (i=0; i<gbsquare.length; i++) {
        gbsquare[i].addEventListener('click', (e) => {

    const boardArray = gameBoard.dest;
    const src = displayController.src;

            for (i=0; i<boardArray.length; i++) {
                if (allEqual(arrayColumn(boardArray, i))) {
                    if (arrayColumn(boardArray, i)[0] == 'X') {
                        winDisplay.textContent = 'Player X has won';
                        

                    }
                    else if (arrayColumn(boardArray, i)[0] == 'O') {
                        winDisplay.textContent = 'Player O has won'
                    }
                    }
                }
            
            for (i=0; i<boardArray.length; i++) {
                if (allEqual(boardArray[i])) {
                    if (boardArray[i][0] == 'X') {
                        winDisplay.textContent = 'Player X has won'
                    }
                    else if (boardArray[i][0] == 'O') {
                        winDisplay.textContent = 'Player O has won'
                    }
                }
            }


            let DiagLeft = boardArray.map((row, index, self) => row[self.length - 1 - index])
            if (allEqual(DiagLeft)) {
                if (boardArray[2][2] == 'X') {
                    winDisplay.textContent = 'Player X has won'
                }
                else if (boardArray[2][2] == 'O') {
                    winDisplay.textContent = 'Player O has won'
                }
            }

            let DiagRight = boardArray.map((row, index) => row[index])
            if (allEqual(DiagRight)) {
                if (boardArray[0][0] == 'X') {
                    winDisplay.textContent = 'Player X has won'
                }
                else if (boardArray[0][0] == 'O') {
                    winDisplay.textContent = 'Player O has won'
                }
        }

        let check = 0;
        function emptyCheck (item) {
            
            if (item == 'X') {
                check += 1
            }

            else if (item == 'O') {
                check += 1
            }

        }

            src.forEach(emptyCheck);

            if (check == 9 && winDisplay.childNodes.length == 0) {
                winDisplay.textContent = `It's a tie`
            }
                
            });
        }
        
            
    

    

})();


