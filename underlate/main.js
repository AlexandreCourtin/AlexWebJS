var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");

var background_img = new Image();
background_img.src = "background.png";

var is_reseting = false;
var player = new Player(600, 450);
var fly = new Fly();
var enemies = [];
var nb_enemies = enemies.length;
var next_enemy_spawn = 1;
var particles = [];

/*for (var i = 0 ; i < 100 ; i++) {
	particles[i] = new Particle(player.x, player.y);
}*/

function reset() {
	player = new Player(600, 450);
	fly = new Fly();
	enemies = [];
	nb_enemies = enemies.length;
	next_enemy_spawn = 1;
	particles = [];
	fly.respawn();
}

function add_flies() {
	particles[player.flies] = new Particle(player.x, player.y);
	player.flies += 1;
}

function add_enemies() {
	enemies[nb_enemies] = new Enemy(next_enemy_spawn);
	nb_enemies += 1;
	if (next_enemy_spawn == 1)
		next_enemy_spawn = -1;
	else
		next_enemy_spawn = 1;
}

fly.respawn();
function loop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background_img, 0, 0);
	//PARTICLES
	for (var i = 0 ; i < particles.length ; i++) {
		if (player.life > 0)
			particles[i].attract(player.x + (Math.random() * 1000) - 500,
				player.y + (Math.random() * 1000) - 500);
		else
			particles[i].attract(600 + (Math.random() * 1000) - 500,
				450 + (Math.random() * 1000) - 500);
		particles[i].draw();
	}
	//MOVEMENTS
	player.move(-keyboard_left + keyboard_right, -keyboard_up + keyboard_down);
	for (var i = 0; i < enemies.length ; i++)
		enemies[i].move();
	//FLIES
	if (player.x > fly.x - 25 && player.x < fly.x + 25 && player.y > fly.y - 30
		&& player.y < fly.y + 30 && player.life > 0) {
		fly.respawn();
		add_enemies();
		add_flies();
	}
	//ENEMIES
	for (var i = 0; i < enemies.length ; i++) {
		if (player.x > enemies[i].x - 25 && player.x < enemies[i].x + 25 && player.y > enemies[i].y - 30
		&& player.y < enemies[i].y + 30 && player.life > 0) {
			enemies[i].respawn();
			player.life -= 1;
		}
		enemies[i].draw();
	}
	fly.draw();
	player.draw();
	draw_ath();
	//RESET
	if (keyboard_space && !is_reseting)
	{
		reset();
		is_reseting = true;
	} else if (!keyboard_space && is_reseting) {
		is_reseting = false;
	}
}

setInterval(loop, 5);
