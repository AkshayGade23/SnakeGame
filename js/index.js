// Games Constsnts and Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const bgMusicSound = new Audio("music/music.mp3");
let lastPaintTime = 0;
let speed = 5;
let snakeArray = [{
    x: 13,
    y: 13,
}];
let food = { x: 6, y: 7 };
let score = 0;
// Game Functions


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollaide(snake) {
    //if you bumb into yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if collaide with edges 
    if (snake[0].x < 0 || snake[0].x > 18 || snake[0].y < 0 || snake[0].y > 18) {
        return true;
    }

}

function gameEngine() {
    bgMusicSound.play();

    //part 1 : updating the snakeArray and Food

    // checking for collison
    if (isCollaide(snakeArray)) {
        gameoverSound.play();
        bgMusicSound.pause();
        inputDir = { x: 0, y: 1 };
        alert("Game Over!!, Press Okay to play again.");
        snakeArray = [{
            x: 13,
            y: 13,
        }];
        bgMusicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
    }

    // if you have eaten the food, increment the score and regenerate the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play();
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        score++;

        // checking score is greater than highScore or not
        // and Updating high Score
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highscoreBox.innerHTML = "High Score : " + highScoreVal;
        }

        scoreBox.innerHTML = "Score : " + score;
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // for moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    //part 2 : Display the snake and food;

    // Displaying the board
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Displaying the board
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}





//main logic starts here
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(highScore);
    highscoreBox.innerHTML = "High Score : " + highScoreVal;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});