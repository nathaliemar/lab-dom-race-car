class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += this.directionY;
    this.left += this.directionX;
    //Q for class: Why "10"? Where do we take that from?
    if (this.left < 10) {
      this.left = 10;
    }
    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }
    // handles right hand side
    //this left = space to left of car; offsetWidth: width of the entire road; this.width = width of the car; -10 is padding right
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }
    this.updatePosition();
  }
  //Update Position is just updating the DOM Element
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  //Q for class: HOW should one come up with this based on solely the instructions?
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
