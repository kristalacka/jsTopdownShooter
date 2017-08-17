var scl = 20;
var incr = 0.1;
var cols, rows, fr;
var zoff = 0;
var bees = [];
var flowfield;
var player;
var shots = [];
var beeImg;

function preload(){
	//beeImg = loadImage('bee.png');
	
}

function setup() {
	createCanvas(800, 600);
	cols = Math.floor(width/scl);
	rows = Math.floor(height/scl);
	fr = createP('')
	player = new Player();
	flowfield = new Array(cols*rows);
	loadBees(150);
}

function draw() {
	background(255);
	
	var yoff = 0;
	for (var y = 0; y < rows; y++){
		var xoff = 0;
		for (var x = 0; x < cols; x++){
			var index = x + y * cols;
			xoff+=incr;	
			var angle = noise(xoff, yoff, zoff) * TWO_PI;
			var v = p5.Vector.fromAngle(angle);
			flowfield[index] = v;
		}
		yoff+=incr;
	}
	zoff += incr/7;
	fr.html(Math.floor(frameRate()))
	
	//display bees
	for (var i = 0; i < bees.length; i++){ 
		bees[i].follow(flowfield);
		bees[i].update();
		bees[i].show();
		bees[i].offScreen(); //return bees if they fly off screen
		if (bees[i].hp<=0){
			bees.splice(i, 1);
			
		}
	}
	
	//collision reduction
	for (var i = 0; i < bees.length; i++){
		for (var j = 0; j<bees.length; j++){
			if (bees[i].intersects(bees[j])){
				bees[i].pos.add(1, 1);
				bees[j].pos.add(-1, -1);
			}
		}	
	}
	
	//bees being shot
	for (var i = 0; i < bees.length; i++){
		for (var j = 0; j < shots.length; j++){
			if(bees[i].intersects(shots[j])){
				bees[i].hp-=shots[j].damage;
			}
		}
	}
	
	for (var i = 0; i < shots.length; i++){
		shots[i].show();
		shots[i].update();
		if (shots[i].a<=0){
			shots.splice(i,1);
		}
	}
	
	if (bees.length <= 0){
		victory();
	}
	player.show();
	player.offScreen();
	player.update();

}

function loadBees(amount){
	for (var i = 0; i < amount; i++){
		bees[i] = new Bee();
	}
}

function victory(){
	push();
	textSize(72);
	textAlign(CENTER, CENTER)
	fill(0);
	text('VICTORY', width/2, height/2);
	pop();
}