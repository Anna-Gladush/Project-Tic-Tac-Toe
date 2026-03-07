// game, player or gameboard objects
const Gameboard = (function () {
  let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  const turn = (marker, row, cell) => {
    if (gameboard[row][cell] !== null) {
      return false;
    } else {
      gameboard[row][cell] = marker;
      console.log(gameboard);
      return true;
    }
  }
  const reset = () => {
    gameboard = [[null, null, null], [null, null, null], [null, null, null]];
    console.log(gameboard);
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

const Game = (function() {
  const {gameboard} = Gameboard;
})();