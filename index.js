// game, player or gameboard objects
const DOMmanipulation = (() => {
  const resetButtonClick = () => {
    reset = document.querySelector('.btn-reset');
    reset.addEventListener('click', () => {
      Gameboard.reset();
      PlayerStats.resetVictory();
      cell.forEach((elem) => {
        elem.style.background = "#A7E399";
        elem.dataset.filled = 'no'
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

const cell = document.querySelectorAll('.cell');
const Gameboard = (function () {
  let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  const turn = (marker, row, col) => {
    if (gameboard[row][col] !== null) {
      return false;
    } else {
      gameboard[row][col] = marker;
      // printSymbol(marker);
      console.log(gameboard);
      win_check(marker);
      return marker;
    }
  }
  const reset = () => {
    gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  }
  const win_check = (marker) => {
    if (gameboard[0].indexOf(null) === -1 && gameboard[1].indexOf(null) === -1 && gameboard[2].indexOf(null) === -1) {
      console.log('Tie');
      PlayerStats.giveVictory("tie");
      DOMmanipulation.audioEvent('tie');
      return true;
    } else if (JSON.stringify(gameboard[0]) == JSON.stringify([marker, marker, marker]) || JSON.stringify(gameboard[1]) == JSON.stringify([marker, marker, marker]) || JSON.stringify(gameboard[2]) == JSON.stringify([marker, marker, marker])) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    } else if (gameboard[0][0] === marker && gameboard[1][1] === marker && gameboard[2][2] === marker) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    } else if (gameboard[0][2] === marker && gameboard[1][1] === marker && gameboard[2][0] === marker) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    } else if (gameboard[0][0] === marker && gameboard[1][0] === marker && gameboard[2][0] === marker) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    } else if (gameboard[0][1] === marker && gameboard[1][1] === marker && gameboard[2][1] === marker) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    } else if (gameboard[0][2] === marker && gameboard[1][2] === marker && gameboard[2][2] === marker) {
      console.log(`${marker} - win`);
      PlayerStats.giveVictory(marker);
      DOMmanipulation.audioEvent('win');
      return true;
    }
    return false;
  }
  return {
    turn,
    reset
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

function printSymbol() {
  let marker = 'X'
  cell.forEach((cube) => {
    cube.addEventListener('click', () => {
      const cellID = cube.dataset.id;
      const turnChoice = convertNumberToCell(cellID);
      const turn = Gameboard.turn(marker, turnChoice.row, turnChoice.col);
      console.log(turn);
      
      if (cube.dataset.filled === 'no') {
        if (turn === 'X') {cube.style.background = "#A7E399 url('images/x-symbol.svg') no-repeat center center"} else { cube.style.background = "#A7E399 url('images/o-symbol.svg') no-repeat center center";}
        cube.style.backgroundSize = '80px';
        cube.dataset.filled = 'yes';
        console.log(turn);
        if (turn !== false){marker = marker === 'X' ? 'O' : 'X';};
      } else {
        return;
      }
    })
  })
}

function convertNumberToCell(idx) {
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


DOMmanipulation.menu();
DOMmanipulation.resetButtonClick();
DOMmanipulation.turnSound();
printSymbol();

PlayerStats.giveVictory("X")
console.log(PlayerStats.getVictory())