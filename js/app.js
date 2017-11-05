
class Enemy {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks

    update(dt) {

        this.collision(dt);

        if (scoreNumber <= 1) {
            this.x += (400 + this.y ) * dt;
        } else if (scoreNumber <= 3) {
            this.x += (450 + this.y ) * dt;
        } else {
            this.x += (500 + this.y ) * dt;
        }

        if (this.x >= 500) {
            this.x = -100;

        }

    }
// collision detection
    collision(dt) {
        let px = player.x * dt;
        let py = player.y;
        let ex = this.x * dt;
        let ey = this.y;


        if (px - 1 <= ex && px >= ex && py === ey) {
            deathsNumber += 1;
            Engine.scorePublic();
            player.x = 200;
            player.y = 300;
            scoreCounter();


        }

    }


    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


class Player {
    constructor(x, y) {
        this.x = 200;
        this.y = 300;
        this.sprite = 'images/char-boy.png';
    }

    update() {


    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {

        if (player.y >= 0 && key == 'up') {
            this.y -= 50;
        }

        if (player.y <= 399 && key == 'down') {
            this.y += 50;
        }

        if (player.x >= 1 && key == 'left') {
            this.x -= 100;
        }


        if (player.x <= 399 && key == 'right') {
            this.x += 100;
        }



        if (player.y == 0) {
            this.winner();

        }

        // console.log('X ' + player.x + "Y " + player.y)
    }


    // reset player position add point and make game harder
    winner() {
        this.x = 200;
        this.y = 300;
        scoreNumber += 1;
        scoreCounter()
        harder()

    }


}
 // increases enemies
function harder() {
    
    if (scoreNumber == 1) {
        allEnemies.push(enemy2);
    }
    if (scoreNumber == 3) {
        allEnemies.push(enemy3);
    }
    if (scoreNumber == 5) {
        allEnemies.push(enemy4);
    }
    if (scoreNumber == 7) {
        allEnemies.push(enemy5);
    }
    if (scoreNumber == 9) {
        allEnemies.push(enemy6);
    }
}

let scoreNumber = 0;
let deathsNumber = 0;
let scoreText = `Score: ${scoreNumber}`
let deathsText = `Deaths: ${deathsNumber}`



// points refresher
function scoreCounter() {
    scoreText = `Score: ${scoreNumber}`
    deathsText = `Deaths: ${deathsNumber}`
    Engine.scorePublic();
}


const enemy1 = new Enemy(-100, 50)
const enemy2 = new Enemy(-250, 150)
const enemy3 = new Enemy(-100, 200)
const enemy4 = new Enemy(-200, 250)
const enemy5 = new Enemy(-400, 100)
const enemy6 = new Enemy(-700, 0)



const allEnemies = [enemy1];


const player = new Player();





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});