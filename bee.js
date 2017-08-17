function Bee(){
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxSpeed = 2;
	this.hp = 100;
	this.size = 10;
	this.force = 0;
	
	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.applyForce = function(force){
		this.acc.add(force);
	}
	
	this.show = function(){
		//stroke(1);
		push();
		noStroke();
		var g = map(this.hp, 100, 0, 200, 0);
		fill(255, g, 20, 255);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
		/*
		tint(255,g,20);
		image(beeImg, this.pos.x, this.pos.y, 20, 54);*/
		
		pop();
	}
	
	this.offScreen = function(){
		if (this.pos.x>width){
			this.pos.x = 0
		}
		if (this.pos.x<0){
			this.pos.x = width
		}
		if (this.pos.y>height){
			this.pos.y = 0
		}
		if (this.pos.y<0){
			this.pos.y = height
		}
	}
	
	this.follow = function(vectors){
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}
	
	this.intersects = function(otherBee){
		var d = dist(this.pos.x, this.pos.y, otherBee.pos.x, otherBee.pos.y);
		return (d<this.size/2+otherBee.size/2);
	}
}