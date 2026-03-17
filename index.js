// game, player or gameboard objects
const cell = document.querySelectorAll('.cell');
const DOMmanipulation = (() => {
  const resetButtonClick = () => {
    reset = document.querySelector('.btn-reset');
    reset.addEventListener('click', () => {
      document.documentElement.style.setProperty('--cursor-hover', 'pointer');
      Gameboard.reset();
      
      cell.forEach((elem) => {
        elem.style.background = "#A7E399";
        elem.dataset.filled = 'no';
      });
    })
  };
  const audioEvent = (event) => {
    if (event === 'win') {
      key = 2;
    } else if (event === 'tie') {
      key = 1;
    }
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (key === 2) { audio.playbackRate = 2}
    audio.play();
  }
  const turnSound = () => {
    const turn = document.querySelector(`audio[data-key="3"]`);
    cell.forEach((cube) => {
      cube.addEventListener('click', () => {
        turn.play();
      })
    })
  }
    const menu = () => {
      start = document.querySelector('.start')
      startBTN = document.querySelector('.btn-start')
      startBTN.addEventListener('click', () => {
        start.style.visibility = "hidden";
    })
  }
  return {
    resetButtonClick,
    audioEvent,
    turnSound,
    menu
  }
})();

const Gameboard = (function () {
  let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  let win = 1;
  const turn = (marker, row, col) => {
    if (gameboard[row][col] !== null || marker === false) {
      return false;
    } else if (win === 0) {
      document.documentElement.style.setProperty('--cursor-hover', 'not-allowed');
      return false;
    } else {
      gameboard[row][col] = marker;
      console.log(gameboard);
      win_check(marker);
      return marker;
    }
  }
  const reset = () => {
    gameboard = [[null, null, null], [null, null, null], [null, null, null]];
    win = 1;
  }
  const win_with_dom = (type, marker = 'tie') => {
    win--;
    PlayerStats.giveVictory(marker);
    DOMmanipulation.audioEvent(type);
    return true;
  }
  const win_check = (marker) => {
    if (win === 0) {
      return;
    }
    if (gameboard[0].indexOf(null) === -1 && gameboard[1].indexOf(null) === -1 && gameboard[2].indexOf(null) === -1) {
      console.log('Tie');
      return win_with_dom('tie');
    } else if (JSON.stringify(gameboard[0]) == JSON.stringify([marker, marker, marker]) || JSON.stringify(gameboard[1]) == JSON.stringify([marker, marker, marker]) || JSON.stringify(gameboard[2]) == JSON.stringify([marker, marker, marker])) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    } else if (gameboard[0][0] === marker && gameboard[1][1] === marker && gameboard[2][2] === marker) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    } else if (gameboard[0][2] === marker && gameboard[1][1] === marker && gameboard[2][0] === marker) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    } else if (gameboard[0][0] === marker && gameboard[1][0] === marker && gameboard[2][0] === marker) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    } else if (gameboard[0][1] === marker && gameboard[1][1] === marker && gameboard[2][1] === marker) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    } else if (gameboard[0][2] === marker && gameboard[1][2] === marker && gameboard[2][2] === marker) {
      console.log(`${marker} - win`);
      return win_with_dom('win', marker);
    }
    return false;
  }

  const printSymbol = (cube, symbol) => {
    if (cube.dataset.filled === 'no') {
      if (symbol === 'X') {
        cube.style.background = "#A7E399 url('images/x-symbol.svg') no-repeat center center"
      } else if (symbol === 'O') {
        cube.style.background = "#A7E399 url('images/o-symbol.svg') no-repeat center center";
      }
      cube.style.backgroundSize = '80px';
      cube.dataset.filled = 'yes';
      console.log(symbol);
    } else {
      return;
    }
  }
  const convertNumberToCell = (idx) => {
    idx = Number(idx);
    switch(idx) {
      case 1: 
        return {row: 0, col: 0};
      case 2: 
        return {row: 0, col: 1};
      case 3: 
        return {row: 0, col: 2};
      case 4: 
        return {row: 1, col: 0};
      case 5: 
        return {row: 1, col: 1};
      case 6: 
        return {row: 1, col: 2};
      case 7: 
        return {row: 2, col: 0};
      case 8: 
        return {row: 2, col: 1};
      case 9: 
        return {row: 2, col: 2};
    }
  }
  const gameTurn = (cube, symbol) => {
      const cellID = cube.dataset.id;
      const turnChoice = convertNumberToCell(cellID);
      const onlyturn = turn(symbol, turnChoice.row, turnChoice.col);
      console.log(onlyturn);
      printSymbol(cube, onlyturn);
      if (onlyturn !== false){
        symbol = symbol === 'X' ? 'O' : 'X'
      };
      return symbol;
  }

  const game = () => {
    let marker = 'X'
    cell.forEach((cube) => {
      cube.addEventListener('click', function handleClick() {
        marker = gameTurn(cube, marker);
      })
    })
  }
  return {
    turn,
    reset,
    game
  }
})();

const PlayerStats = (function() {
  let x_win = 0;
  let o_win = 0;
  let tie = 0;
  const giveVictory = (marker) => {
    if (marker === 'X') {
      x_win++;
    } else if (marker === 'O') {
      o_win++;
    } else if (marker === 'tie') {
      tie++;
    }
  }
  const getVictory = () => {
    return {x_win, o_win, tie}
  }
  const resetVictory = () => {
    x_win = 0;
    o_win = 0;
    tie = 0;
  }
  return {
    giveVictory,
    getVictory,
    resetVictory
  }
})();


DOMmanipulation.menu();
DOMmanipulation.resetButtonClick();
DOMmanipulation.turnSound();
Gameboard.game();

console.log(PlayerStats.getVictory());