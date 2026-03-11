// game, player or gameboard objects
const Gameboard = (function () {
  let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  const turn = (marker, row, cell) => {
    if (gameboard[row][cell] !== null) {
      return false;
    } else {
      gameboard[row][cell] = marker;
      console.log(gameboard);
      win_check(marker);
      return true;
      
    }
  }
  const reset = () => {
    gameboard = [[null, null, null], [null, null, null], [null, null, null]];
    console.log(gameboard);
  }
  const win_check = (marker) => {
    // check if all cells are filled
    if (gameboard[0].indexOf(null) === -1 && gameboard[1].indexOf(null) === -1 && gameboard[2].indexOf(null) === -1) {
      console.log('Tie');
    } else if (gameboard[0] == [marker, marker, marker] || gameboard[1] == [marker, marker, marker] || gameboard[2] == [marker, marker, marker]) {
      console.log(`${marker} - win`);
    } else if (gameboard[0][0] === marker && gameboard[0][1] === marker && gameboard[0][2] === marker) {
      console.log(`${marker} - win`);
    } else if (gameboard[0][0] === marker && gameboard[1][0] === marker && gameboard[2][0] === marker) {
      console.log(`${marker} - win`);
    } else if (gameboard[0][1] === marker && gameboard[1][1] === marker && gameboard[2][1] === marker) {
      console.log(`${marker} - win`);
    } else if (gameboard[0][2] === marker && gameboard[1][2] === marker && gameboard[2][2] === marker) {
      console.log(`${marker} - win`);
    }
    // check if there is three in a row>
  }
  return {
    turn,
    reset
  }
})();

// const Player = (function(marker) {
//   let marker = marker;
//   let win = 0;
//   let loss = 0;
//   let tie = 0;
// })();
