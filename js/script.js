window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  // Shorter version:
  //  startButton.addEventListener("click", startGame) ;
  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  restartButton.addEventListener("click", restartGame);

  function restartGame() {
    window.location.reload();
  }

  function handleKeydown(event) {
    const key = event.key; // can be destructured to const {key}=event (same thing!)
    // to ensure we ONLY preventDefault for these 4 keys
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (key === "ArrowLeft") {
        game.player.directionX = -1;
      }
      if (key === "ArrowUp") {
        game.player.directionY = -1;
      }
      if (key === "ArrowRight") {
        game.player.directionX = 1;
      }
      if (key === "ArrowDown") {
        game.player.directionY = 1;
      }
    }
  }

  //This was not included in the solution, but the gif indicated sth like this existing
  function handleKeyup(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (key === "ArrowLeft" || key === "ArrowRight") {
        game.player.directionX = 0;
      }
      if (key === "ArrowUp" || key === "ArrowDown") {
        game.player.directionY = 0;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
