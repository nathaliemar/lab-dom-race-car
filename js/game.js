class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
    this.player.move();

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      //Math random: Ensure not to add obstacle immediately
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
    //add an obstacle if there is none
    if (this.obstacles.length) {
      const [obstacle] = this.obstacles;
      obstacle.move();
      //collision! remove a life, reset obstacles
      if (this.player.didCollide(obstacle)) {
        this.lives--;
        const lives = document.querySelector("#lives");
        lives.textContent = this.lives;
        obstacle.element.remove();
        this.obstacles = [];
        if (this.lives === 0) {
          this.endGame();
        }
      }

      if (obstacle.top > this.height) {
        //Add score everytime a obstacle passes
        this.score++;
        //update the dom to show the score
        const score = document.querySelector("#score");
        score.textContent = this.score;
        //remove the obstacle at the bottom border
        obstacle.element.remove();
        this.obstacles = [];
      }
    }
  }
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
