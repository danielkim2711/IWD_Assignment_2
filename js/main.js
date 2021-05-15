const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const keys = [];

const player = {
    x: 500,
    y: 350,
    width: 40,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 7,
    moving: false
};

const character = new Image();
character.src = "img/hulk.png";
const background = new Image();
background.src = "img/beach.png";

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    // Move Left
    if (keys[37] && player.x > 0 || keys[65] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        // Move Up
    } else if (keys[38] && player.y > 250 || keys[87] && player.y > 250) {
        player.y -= player.speed;
        player.frameY = 3;
        // Move Right
    } else if (keys[39] && player.x < canvas.width - player.width || keys[68] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
        // Move Down
    } else if (keys[40] && player.y < canvas.height - player.height || keys[83] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    } else player.frameX = 0;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawCharacter(character, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    handlePlayerFrame();
    requestAnimationFrame(update);
}

update();