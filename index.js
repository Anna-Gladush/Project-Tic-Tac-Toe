// game, player or gameboard objects
const Gameboard = (function () {
  let gameboard = [[null, null, null], [null, null, null], [null, null, null]];
  const turn = (marker, row, column) => {
    // if (gameboard[row][column] !== null) {return ...smth...}
    gameboard[row][column] = marker;
  }
})();

// Gameboard.game
const Player = (function(marker) {
  // marker;
  // let win = 0;
  // let loss = 0;
  // let tie = 0;
})();

const Game = (function() {
  //smth
})();