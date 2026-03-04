// game, player or gameboard objects
function Gameboard() {
  let gameboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  const turn = (marker, number) => {
    gameboard.splice(number - 1, 1, marker);
    console.log(gameboard);
  }
  const game = () => {
    turn('X', 4);
  }
}
// Gameboard.game
function Player(marker) {
  // let win = 0;
  // let tie = 0;
  // let loss = 0;
  // marker;
}