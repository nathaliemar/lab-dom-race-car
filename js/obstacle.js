class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    //Where do 300 & 70 come from? -> check available space and create random no within
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0; //always start from top border of screen
    this.width = 100;
    this.height = 150;
    this.element = document.createElement("img");

    this.element.src = "./images/redCar.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
