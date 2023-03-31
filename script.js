//audio control
let bgm = document.getElementById("BGM");
let popSound = document.getElementById("popSound");
let gameOverSound = document.getElementById("gameOver")

function beltChange(){
    if(document.querySelector('.score').innerText > 20){
        document.getElementById('beltBanner').innerHTML = "Yellow Belt!";
        document.getElementById('beltBanner').classList.toggle("yellow");
    }
    if(document.querySelector('.score').innerText > 30){
        document.getElementById('beltBanner').innerHTML = "Orange Belt!";
        document.getElementById('beltBanner').classList.toggle("orange");
    }
    if(document.querySelector('.score').innerText > 40){
        document.getElementById('beltBanner').innerHTML = "Green Belt!";
        document.getElementById('beltBanner').classList.toggle("green");
    }
    if(document.querySelector('.score').innerText > 50){
        document.getElementById('beltBanner').innerHTML = "Blue Belt!";
        document.getElementById('beltBanner').classList.toggle("blue");
    }
    if(document.querySelector('.score').innerText > 60){
        document.getElementById('beltBanner').innerHTML = "Purple Belt!";
        document.getElementById('beltBanner').classList.toggle("purple");
    }
    if(document.querySelector('.score').innerText > 70){
        document.getElementById('beltBanner').innerHTML = "Brown Belt!";
        document.getElementById('beltBanner').classList.toggle("brown");
    }
    if(document.querySelector('.score').innerText > 80){
        document.getElementById('beltBanner').innerHTML = "Black Belt!";
        document.getElementById('beltBanner').classList.toggle("black");
    }
}

function halfVol() {
    bgm.volume = 0.3;
    popSound.volume = 0.8;
    gameOverSound.volume = 0.8;
}

halfVol();
var rgb = ['red','navy','yellow', 'ForestGreen','tomato','DeepPink','SeaGreen','MediumPurple', 'Indigo','SpringGreen','PaleGreen','PapayaWhip','Gold','Bisque'];
var bw = ['black', 'white']
// setting up the canvas
const canvas = document.querySelector('#space')
const c = canvas.getContext('2d')
const image = document.querySelector('#bgImg');
const Bokie = document.querySelector('#Borkie');
const Love =  document.querySelector('#Love')
canvas.width = innerWidth * .995;
canvas.height = innerHeight * .995;

// creating an function to animate the canvas
let freezeFrame;
function animate() {
    freezeFrame =
        requestAnimationFrame(animate);
    c.drawImage(image, 0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'black';
    // c.fillRect(0, 0, canvas.width, canvas.height);
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(image, 0, 0, canvas.width, canvas.height)
    love.update();
    player.update();
    effects.forEach((effect, index) => {
        if(effect.alpha <= 0){
            effects.splice(index, 1)
        }
        else {
        effect.update();
        }
    })
    attacks.forEach((attack, Index) => {
        attack.update()
        // console.log(attacks)
        // to remove attacks that fly out of bound
        if (canvas.width < attack.x || attack.x < 0) {
            attacks.splice(Index, 1)
        }
        if (canvas.height < attack.y || attack.y < 0) {
            attacks.splice(Index, 1)
        }
    });
    mobs.forEach((enemy, eIndex) => {
        enemy.update()
        const distanceEnd = Math.hypot(player.position.x - enemy.x, player.position.y - enemy.y);
        //GameOver
        if (distanceEnd - player.radius - enemy.radius < 1) {
            gameOverSound.play();
            cancelAnimationFrame(freezeFrame)
            bgm.pause();
            beltChange();
            document.getElementById('gameOverBanner').classList.remove("hide");
        }

        // collision detection between enemy and attack
        attacks.forEach((attack, attIndex) => {
            const distance = Math.hypot(attack.x - enemy.x, attack.y - enemy.y)
            if (distance - enemy.radius - attack.radius < 1) {
                //enemy death effects
                for(let i = 0; i < Math.random() * 500 + 100; i++){
                    effects.push(new Effect(enemy.x, enemy.y, Math.random() * 5 + 1, rgb[Math.round(Math.random() * (rgb.length - 1))],{x:Math.random()- 0.5, y:Math.random()- 0.5}, Math.random() * 5))
                }
                // console.log(effects)
                //score counter with mobs and attacks hit detect
                setTimeout(() => {
                    // console.log("a Hit!")
                    document.querySelector('.score').innerText++;
                    document.querySelector('.scoreUI').innerText++;
                    popSound.play()
                    attacks.splice(attIndex, 1)
                    mobs.splice(eIndex, 1)
                }, 1)
            }
        });
    });

    // //dash/tp
    // if (keys.Shift.pressed) {
    //     player.speed = 20;
    // }
    // else {
    //     player.speed = 5;
    // }
    // control update
    if (keys.w.pressed && player.position.y - player.radius >= 0) {
        player.velocity.y = - player.speed;
    }
    else if (keys.s.pressed && player.position.y + player.radius <= canvas.height) {
        player.velocity.y = player.speed;
    }
    else {
        player.velocity.y = 0;
    }

    if (keys.a.pressed && player.position.x >= player.radius) {
        player.velocity.x = -player.speed;
    }
    else if (keys.d.pressed && player.position.x + player.radius <= canvas.width) {
        player.velocity.x = player.speed;
    }
    else {
        player.velocity.x = 0;
    }

    if (keys.space.pressed) {
        player.position.x = canvas.width / 2;
        player.position.y = canvas.height / 2;
        // console.log(attacks)
        // console.log(player.velocity.x, player.velocity.y)
    }
}
// creating a player class (image, radius, position, velocity)
class Player {
    constructor() {
        //this sprite
        // this.image = document.querySelector('#bgImg')
        // this.width = 50;
        // this.height = 50;
        this.radius = 20;

        this.position = {
            x: canvas.width / 2 - this.radius,
            y: canvas.height / 2 - this.radius
        }


        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 5;
    }
    // a draw method to draw the play onto the canvas
    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // c.beginPath();
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = 'CornflowerBlue';
        // c.fill()
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius + 0.1, 0, Math.PI * 2, false);
        c.strokeStyle = 'black'
        c.stroke();
        c.drawImage(Bokie, this.position.x - 20, this.position.y - 22, 40, 40)
    }
    // an update method to change the player position and then re-draw the player with new into
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Home {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 20;
    }

    draw() {
        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = 'Plum';
        // c.fill()
        c.beginPath();
        c.arc(this.x, this.y, this.radius + 0.1, 0, Math.PI * 2, false);
        c.strokeStyle = 'white'
        c.stroke();
        c.drawImage(Love, this.x - 20, this.y - 22, 40, 40)
    }
    update() {
        this.draw();
    }
}

// creating a key array to check which key is currently being pressed
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}




// eventlistener for keypress
window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            keys.space.pressed = true;
            break;
    }
})

// eventlistener for keyreleased
window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
})

//Attacks

class Attack {
    constructor(player, x, y, radius, color, velocity, speed) {
        let rgb = ['red', 'blue', 'green', 'purple', 'white']
        this.player = player
        this.x = player.position.x;
        this.y = player.position.y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = speed
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        c.beginPath();
        c.arc(this.x, this.y, this.radius + 0.1, 0, Math.PI * 2, false);
        c.strokeStyle = 'black'
        c.stroke();
        // c.drawImage(this.image, thisx, this.y,this.width, this.height)
    }

    update() {
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
        this.draw();
    }
}

class Enemy {
    constructor(player, x, y, radius, color, velocity, speed) {
        let rgb = ['red', 'blue', 'green', 'purple', 'white']
        this.player = player
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = speed
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        c.beginPath();
        c.arc(this.x, this.y, this.radius+0.5, 0, Math.PI * 2, false);
        c.strokeStyle = 'green'
        c.stroke();
        // c.drawImage(this.image, thisx, this.y,this.width, this.height)
    }

    update() {
        if (this.x > player.position.x) {
            this.x -= this.velocity.x * this.speed;
        }
        else if (this.x < player.position.x) {
            this.x += this.velocity.x * this.speed;
        }
        if (this.y > player.position.y) {
            this.y -= this.velocity.y * this.speed;
        }
        else if (this.y < player.position.y) {
            this.y += this.velocity.y * this.speed;
        }
        this.draw();
    }
}

class Effect {
    constructor(x, y, radius, color, velocity,speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = speed;
        this.alpha = 1;
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.save()
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'white';
        c.stroke()
        c.restore()
        // c.drawImage(this.image, thisx, this.y,this.width, this.height)
    }

    update() {
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
        this.draw();
        this.alpha -= 0.01
    }
}

let spawnDelay = 1000;
let adjustSpawn = (0.1 / 5000) * spawnDelay;

function spawnEnemies() {
    const radius = 35;
    let x;
    let y;
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
    }
    else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = bw[Math.round(Math.random() * (bw.length - 1))]
    const speed = 2;

    const angle = Math.atan2(y + player.position.y, x + player.position.x);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
    // console.log(Math.round(Math.random() * (bw.length - 1)));
    mobs.push(new Enemy(player, x, y, radius, color, velocity, speed))
    if (spawnDelay > 100) {
        spawnDelay = spawnDelay - (spawnDelay * adjustSpawn);
    }
    console.log(spawnDelay)
    setTimeout(() => {
        spawnEnemies();
    }, spawnDelay)

}



// creating our OBJECTS
let player = new Player();
let love = new Home();
// const attack = new Attack(player, canvas.width/2, canvas.height/2, 5, 'red', {x:1, y:1})
let attacks = [];
let mobs = [];
let effects = [];
// const lightingFlash = new Attack(player, player.position.x, player.position.y, 30, 'gold', 0, 0)

//reset helper
function restart(){
    player = new Player();
    love = new Home();
    // const attack = new Attack(player, canvas.width/2, canvas.height/2, 5, 'red', {x:1, y:1})
    attacks = [];
    mobs = [];
    effects = [];
    spawnDelay = 1000;
    document.querySelector('.score').innerText = 0;
    document.querySelector('.scoreUI').innerText = 0;
}

// let the player cast an ATTACK once the mouse is clicked
addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - player.position.y, e.clientX - player.position.x)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // let rgb = ["red", "blue", "green", "purple", "white"];
    // let colorRandom = rgb[Math.round((Math.random() * 4))];
    // console.log(colorRandom)
    // console.log(e.clientX, e.clientY)
    attacks.push(new Attack(player, player.position.x, player.position.y, 10, 'red', velocity, 7))
    // console.log(attacks)
})
// calling the animate function
document.getElementById('strBtn').addEventListener('click',() =>{
    document.getElementById('startBanner').classList.add("hide");
    document.getElementById('UI').classList.remove("hide");
    document.getElementById('space').classList.remove("hide");
    document.getElementById('UI').classList.remove("hide");
    bgm.play();
    animate();
    spawnEnemies();
})

document.getElementById('restrBtn').addEventListener('click',() =>{
    location.reload();
})